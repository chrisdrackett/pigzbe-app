import {apiURL} from '../selectors';
import {settingsUpdate, appError} from './';
import isEmail from '../utils/is-email';

export const DEVICE_AUTH_ONLINE = 'DEVICE_AUTH_ONLINE';
export const DEVICE_AUTH_ERROR = 'DEVICE_AUTH_ERROR';
export const DEVICE_AUTH_REGSITERED = 'DEVICE_AUTH_REGSITERED';
export const DEVICE_AUTH_CLEAR = 'DEVICE_AUTH_CLEAR';
export const DEVICE_AUTH_LOADING = 'DEVICE_AUTH_LOADING';
export const DEVICE_AUTH_VERIFY_SUCCESS = 'DEVICE_AUTH_VERIFY_SUCCESS';
export const DEVICE_AUTH_VERIFY_FAIL = 'DEVICE_AUTH_VERIFY_FAIL';
export const DEVICE_AUTH_VERIFY_REQUESTED = 'DEVICE_AUTH_VERIFY_REQUESTED';

export const deviceAuthLoading = value => ({type: DEVICE_AUTH_LOADING, value});

export const deviceAuthError = error => ({type: DEVICE_AUTH_ERROR, error});

export const deviceAuthClear = () => ({type: DEVICE_AUTH_CLEAR});

export const deviceAuthOnline = () => async (dispatch, getState) => {
    try {
        const api = apiURL(getState());
        const result = await (await fetch(`${api}/auth`)).json();

        dispatch({type: DEVICE_AUTH_ONLINE, online: result.success});
    } catch (error) {
        dispatch({type: DEVICE_AUTH_ONLINE, online: false});
    }
};

export const deviceAuthRegister = (email, phone, country, requestLogin = true) => async (dispatch, getState) => {
    const emailValid = email && isEmail(email);
    if (!emailValid) {
        const err = new Error('Invalid email address');
        dispatch(appError(err));
        dispatch(deviceAuthError(err));
        return false;
    }

    dispatch(deviceAuthLoading(true));
    dispatch(deviceAuthError(null));
    dispatch(appError(null));

    try {
        const api = apiURL(getState());
        const result = await (await fetch(`${api}/auth/register`, {
            method: 'POST',
            body: JSON.stringify({
                email,
                phone,
                country
            })
        })).json();

        // console.log('result', result);
        if (result.success) {
            const {user: {id}, qr_code} = result;
            dispatch({type: DEVICE_AUTH_REGSITERED, id, qrCode: qr_code, email, phone, country});
            if (requestLogin) {
                await dispatch(deviceAuthLogin());
            }
        } else {
            const err = new Error(result.message.message || result.message);
            dispatch(appError(err));
            dispatch(deviceAuthError(err));
            dispatch(deviceAuthLoading(false));
            return false;
        }
        dispatch(deviceAuthLoading(false));
    } catch (error) {
        dispatch(deviceAuthError(error));
        dispatch(appError(error));
        dispatch(deviceAuthLoading(false));
        return false;
    }
    return true;
};

export const deviceAuthLogin = () => async (dispatch, getState) => {
    dispatch(deviceAuthError(null));
    dispatch(appError(null));

    try {
        const api = apiURL(getState());
        const {id} = getState().deviceAuth;
        const result = await (await fetch(`${api}/auth/login?id=${id}`)).json();

        console.log('result', result);
        if (result.success) {
            dispatch({type: DEVICE_AUTH_VERIFY_REQUESTED});
        } else {
            const err = new Error(result.message.message || result.message);
            dispatch(appError(err));
            dispatch(deviceAuthError(err));
        }
    } catch (error) {
        console.log('error', error);
        dispatch(appError(error));
        dispatch(deviceAuthError(error));
    }
};

export const deviceAuthVerify = code => async (dispatch, getState) => {
    dispatch(deviceAuthLoading(true));
    dispatch(deviceAuthError(null));
    dispatch(appError(null));

    try {
        const api = apiURL(getState());
        const {id, email, phone, country} = getState().deviceAuth;
        const result = await (await fetch(`${api}/auth/verify?id=${id}&code=${code}`)).json();

        console.log('result', result);
        if (result.success) {
            dispatch({type: DEVICE_AUTH_VERIFY_SUCCESS});
            dispatch(settingsUpdate({authyId: id, email, phone, country}));
        } else {
            dispatch({type: DEVICE_AUTH_VERIFY_FAIL});
            const err = new Error(result.message.message || result.message);
            dispatch(appError(err));
            dispatch(deviceAuthError(err));
        }
        dispatch(deviceAuthLoading(false));
    } catch (error) {
        console.log('error', error);
        dispatch(deviceAuthError(error));
        dispatch(appError(error));
        dispatch(deviceAuthLoading(false));
    }
};

export const deviceAuthSkip = (email, phone, country) => async dispatch => {
    dispatch(settingsUpdate({authyId: null, email, phone, country}));
};
