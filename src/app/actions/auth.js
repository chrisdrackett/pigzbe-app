import Keychain from '../utils/keychain';
import TouchId from '../utils/touch-id';
import {KEYCHAIN_ID_PASSCODE} from '../constants';
// import {clearKeys, appError} from './';
import {appError} from './';

export const AUTH_CREATE = 'AUTH_CREATE';
export const AUTH_LOGIN_START = 'AUTH_LOGIN_START';
export const AUTH_LOGIN_FAIL = 'AUTH_LOGIN_FAIL';
export const AUTH_LOGIN = 'AUTH_LOGIN';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';
export const AUTH_TOUCH_ID_SUPPORT = 'AUTH_TOUCH_ID_SUPPORT';

export const authCheckTouchId = () => async dispatch => {
    const support = await TouchId.getSupport();
    dispatch({type: AUTH_TOUCH_ID_SUPPORT, support});
};

export const authTouchId = () => () => TouchId.authenticate();

export const authKeychain = () => async () => {
    const result = await Keychain.load(KEYCHAIN_ID_PASSCODE);

    if (result.error) {
        console.log(result.error.message);
        return null;
    }

    return result.key;
};

export const authCreate = passcode => async dispatch => {
    dispatch({type: AUTH_CREATE, passcode});
    await Keychain.save(KEYCHAIN_ID_PASSCODE, passcode);
    // await dispatch(clearKeys());
    await dispatch(authLogin(passcode));
};

export const authLogin = passcode => async dispatch => {
    dispatch(appError(null));
    dispatch({type: AUTH_LOGIN_START});

    const savedPasscode = await dispatch(authKeychain());

    if (!passcode || !savedPasscode || passcode !== savedPasscode) {
        const error = new Error('Invalid passcode');
        dispatch({type: AUTH_LOGIN_FAIL, error});
        dispatch(appError(error));
        return false;
    }

    dispatch({type: AUTH_LOGIN});
    return true;
};

export const authLogout = () => async dispatch => {
    dispatch({type: AUTH_LOGOUT});
};

export const authClear = () => async dispatch => {
    await Keychain.clear(KEYCHAIN_ID_PASSCODE);
    dispatch(authLogout());
};
