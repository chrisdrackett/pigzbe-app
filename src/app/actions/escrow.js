import {loadAccount, Transaction, getServer, getServerURL, validateTransaction} from '@pigzbe/stellar-utils';
import {loadWallet} from './';
import wait from './wait';
import openURL from '../utils/open-url';
import {getWolloBalance} from './';
import fetchTimeout from '../utils/fetch-timeout';
import {apiURL} from '../selectors';

export const ESCROW_SET = 'ESCROW_SET';
export const ESCROW_ACCOUNT = 'ESCROW_ACCOUNT';
export const ESCROW_TX_RESULT = 'ESCROW_TX_RESULT';
export const ESCROW_TX_VALIDATE = 'ESCROW_TX_VALIDATE';
export const ESCROW_SUBMITTING = 'ESCROW_SUBMITTING';
export const ESCROW_ERROR = 'ESCROW_ERROR';

export const loadEscrow = () => async (dispatch, getState) => {
    try {
        const api = apiURL(getState());
        const {publicKey} = getState().wollo;
        const escrow = await fetchTimeout(`${api}/escrow/config?pk=${publicKey}`);

        if (escrow && !escrow.error) {
            dispatch({type: ESCROW_SET, escrow});
        }
    } catch (error) {
        console.log(error);
    }
};

export const loadEscrowAccount = () => async (dispatch, getState) => {
    try {
        const {escrowPublicKey} = getState().escrow;
        const account = await loadAccount(escrowPublicKey);
        const balance = getWolloBalance(account);
        dispatch({type: ESCROW_ACCOUNT, account, balance});
        return account;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const validateTx = xdr => async dispatch => {
    try {
        const validation = await validateTransaction(xdr);
        console.log('1. DONE validateTx');
        dispatch({type: ESCROW_TX_VALIDATE, xdr, validation});
    } catch (error) {
        console.log(error);
    }
};

const submitting = value => ({type: ESCROW_SUBMITTING, value});

const escrowError = error => ({type: ESCROW_ERROR, error});

export const submitTransaction = xdr => async (dispatch, getState) => {
    const {destinationPublicKey} = getState().escrow;
    try {
        dispatch(escrowError(null));
        dispatch(submitting(true));
        const tx = await getServer().submitTransaction(new Transaction(xdr));
        dispatch({type: ESCROW_TX_RESULT, tx});
        await wait(1);
        await dispatch(validateTx(xdr));
        console.log('2. DONE validateTx');
        await dispatch(loadWallet(destinationPublicKey));
        dispatch(loadEscrowAccount());
    } catch (error) {
        dispatch(escrowError(error));
    } finally {
        dispatch(submitting(false));
    }
};

export const viewTransaction = txId => () => openURL(`${getServerURL()}transactions/${txId}`);
