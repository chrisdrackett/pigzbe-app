import {Keypair} from '@pigzbe/stellar-utils';
import {loadAccount} from './wollo';
import {load, save, clear} from '../utils/keychain';
import {authenticate} from '../utils/touch-id';
import {KEYCHAIN_ID_STELLAR_KEY, KEYCHAIN_ID_ETH_KEY} from '../constants';

export const AUTH_LOGIN_START = 'AUTH_LOGIN_START';
export const AUTH_LOGIN_FAIL = 'AUTH_LOGIN_FAIL';
export const AUTH_LOGIN = 'AUTH_LOGIN';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';
export const AUTH_TEST_USER = 'AUTH_TEST_USER';

export const authTouchId = () => () => authenticate();

export const authKeychain = () => async () => {
    const result = await load(KEYCHAIN_ID_STELLAR_KEY);

    if (result.error) {
        console.log('Error:', result.error.message);
    }

    return result.key;
};

export const authLogin = secretKey => dispatch => {
    dispatch({type: AUTH_LOGIN_START});

    let keypair = null;

    try {
        keypair = Keypair.fromSecret(secretKey);
    } catch (e) {}

    if (!keypair) {
        const error = new Error('Invalid key');
        dispatch({type: AUTH_LOGIN_FAIL, error});
        return Promise.reject(error);
    }

    return dispatch(loadAccount(keypair.publicKey()))
        // .then(() => wait(0.25))
        .then(() => dispatch({type: AUTH_LOGIN, keypair}))
        .then(() => save(KEYCHAIN_ID_STELLAR_KEY, keypair.secret()))
        .catch(error => dispatch({type: AUTH_LOGIN_FAIL, error}));
};

export const authLogout = () => dispatch => {
    clear(KEYCHAIN_ID_STELLAR_KEY);
    clear(KEYCHAIN_ID_ETH_KEY);
    dispatch({type: AUTH_LOGOUT});
};

export const authTestUser = testUserKey => ({type: AUTH_TEST_USER, testUserKey});
