import Keychain from '../utils/keychain';
import {authenticate} from '../utils/touch-id';
import {KEYCHAIN_ID_PASSCODE} from '../constants';
import {load} from './';

export const AUTH_CREATE = 'AUTH_CREATE';
export const AUTH_LOGIN_START = 'AUTH_LOGIN_START';
export const AUTH_LOGIN_FAIL = 'AUTH_LOGIN_FAIL';
export const AUTH_LOGIN = 'AUTH_LOGIN';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';


export const authTouchId = () => () => authenticate();

export const authKeychain = () => async () => {
    const result = await Keychain.load(KEYCHAIN_ID_PASSCODE);

    if (result.error) {
        console.log('Error:', result.error.message);
        return null;
    }

    return result.key;
};

export const authCreate = passcode => async dispatch => {
    dispatch({type: AUTH_CREATE, passcode});
    await Keychain.save(KEYCHAIN_ID_PASSCODE, passcode);
    dispatch(load(passcode));
};

export const authLogin = passcode => async dispatch => {
    dispatch({type: AUTH_LOGIN_START});

    const savedPasscode = await dispatch(authKeychain());

    if (!passcode || !savedPasscode || passcode !== savedPasscode) {
        const error = new Error('Invalid passcode');
        dispatch({type: AUTH_LOGIN_FAIL, error});
        return;
    }

    dispatch({type: AUTH_LOGIN});
};

export const authLogout = () => async dispatch => {
    await Keychain.clear(KEYCHAIN_ID_PASSCODE);
    dispatch({type: AUTH_LOGOUT});
};
