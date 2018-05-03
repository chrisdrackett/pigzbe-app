import Stellar from '../stellar';
import {getServer, getServerURL} from '../stellar/server';
import {validate} from '../stellar/transaction';
import {loadContent, loadAccount} from './';
import wait from './wait';
import openURL from '../utils/open-url';
import {getWolloBalance} from './';

export const ESCROW_SET = 'ESCROW_SET';
export const ESCROW_ACCOUNT = 'ESCROW_ACCOUNT';
export const ESCROW_TX_RESULT = 'ESCROW_TX_RESULT';
export const ESCROW_TX_VALIDATE = 'ESCROW_TX_VALIDATE';

export const loadEscrow = () => (dispatch, getState) => {
    const {publicKey} = getState().auth;
    return dispatch(loadContent('sys.id=4NWW9JokdOM4S4kAIo6q4q'))
        .then(result => result.items.pop().fields.data)
        .then(data => {
            const escrow = data.find(e => e.destinationPublicKey === publicKey);
            console.log('loadEscrow', escrow);
            dispatch({type: ESCROW_SET, escrow});
        });
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

export const submitTransaction = xdr => dispatch => {
    return getServer()
        .submitTransaction(new Stellar.Transaction(xdr))
        .then(tx => dispatch({type: ESCROW_TX_RESULT, tx}))
        .then(() => wait(1))
        .then(() => dispatch(loadAccount()))
        .then(() => dispatch(loadEscrowAccount()));
};

export const viewTransaction = txId => () => openURL(`${getServerURL()}transactions/${txId}`);
