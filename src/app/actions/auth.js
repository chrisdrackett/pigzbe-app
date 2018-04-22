import Stellar from '../stellar';
import {loadAccount} from './wollo';
import wait from './wait';

export const AUTH_LOGIN_START = 'AUTH_LOGIN_START';
export const AUTH_LOGIN_FAIL = 'AUTH_LOGIN_FAIL';
export const AUTH_LOGIN = 'AUTH_LOGIN';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';

export const authLogin = secretKey => dispatch => {
    dispatch({type: AUTH_LOGIN_START});

    let keypair = null;

    try {
        keypair = Stellar.Keypair.fromSecret(secretKey);
    } catch (e) {}

    if (!keypair) {
        dispatch({type: AUTH_LOGIN_FAIL, error: new Error('Invalid key')});
        return Promise.reject();
    }

    return dispatch(loadAccount(keypair.publicKey()))
        .then(() => wait(0.25))
        .then(() => dispatch({type: AUTH_LOGIN, keypair}))
        .catch(error => dispatch({type: AUTH_LOGIN_FAIL, error}));
};

export const authLogout = () => ({type: AUTH_LOGOUT});
