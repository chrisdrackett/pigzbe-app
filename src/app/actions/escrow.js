import {Transaction} from '../stellar';
import {getServer, getServerURL} from '../stellar/server';
import {validate} from '../stellar/transaction';
import {loadAccount} from './';
import wait from './wait';
import openURL from '../utils/open-url';
import apiURL from '../utils/api-url';
import {getWolloBalance} from './';
import fetchJSON from './fetch-json';

export const ESCROW_SET = 'ESCROW_SET';
export const ESCROW_ACCOUNT = 'ESCROW_ACCOUNT';
export const ESCROW_TX_RESULT = 'ESCROW_TX_RESULT';
export const ESCROW_TX_VALIDATE = 'ESCROW_TX_VALIDATE';
export const ESCROW_SUBMITTING = 'ESCROW_SUBMITTING';
export const ESCROW_ERROR = 'ESCROW_ERROR';

const load = (query = '') => () => fetchJSON(`${apiURL()}/escrow/config${query}`);

export const loadEscrow = () => (dispatch, getState) => {
    const {publicKey} = getState().auth;
    return dispatch(load(`?pk=${publicKey}`))
        .then(escrow => {
            if (escrow && !escrow.error) {
                dispatch({type: ESCROW_SET, escrow});
            }
        })
        .catch(error => console.log(error));
};

export const loadEscrowAccount = () => (dispatch, getState) => {
    const {escrowPublicKey} = getState().escrow;
    return getServer().loadAccount(escrowPublicKey)
        .then(account => {
            const balance = getWolloBalance(account);
            dispatch({type: ESCROW_ACCOUNT, account, balance});
            return account;
        });
};

export const validateTransaction = xdr => dispatch => {
    validate(xdr)
        .then(validation => dispatch({type: ESCROW_TX_VALIDATE, xdr, validation}));
};

const submitting = value => ({type: ESCROW_SUBMITTING, value});

const escrowError = error => ({type: ESCROW_ERROR, error});

export const submitTransaction = xdr => (dispatch, getState) => {
    const {destinationPublicKey} = getState().escrow;
    dispatch(escrowError(null));
    dispatch(submitting(true));
    return getServer()
        .submitTransaction(new Transaction(xdr))
        .then(tx => dispatch({type: ESCROW_TX_RESULT, tx}))
        .then(() => wait(1))
        .then(() => dispatch(validateTransaction(xdr)))
        .then(() => dispatch(loadAccount(destinationPublicKey)))
        .then(() => dispatch(loadEscrowAccount()))
        .catch(error => dispatch(escrowError(error)))
        .finally(() => dispatch(submitting(false)));
};

export const viewTransaction = txId => () => openURL(`${getServerURL()}transactions/${txId}`);
