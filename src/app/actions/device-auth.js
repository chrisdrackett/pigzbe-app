import {apiURL} from '../selectors';

export const DEVICE_AUTH_ONLINE = 'DEVICE_AUTH_ONLINE';
export const DEVICE_AUTH_ERROR = 'DEVICE_AUTH_ERROR';
export const DEVICE_AUTH_REGSITERED = 'DEVICE_AUTH_REGSITERED';
export const DEVICE_AUTH_CLEAR = 'DEVICE_AUTH_CLEAR';
export const DEVICE_AUTH_LOADING = 'DEVICE_AUTH_LOADING';
export const DEVICE_AUTH_VERIFY_SUCCESS = 'DEVICE_AUTH_VERIFY_SUCCESS';
export const DEVICE_AUTH_VERIFY_FAIL = 'DEVICE_AUTH_VERIFY_FAIL';
export const DEVICE_AUTH_VERIFY_REQUESTED = 'DEVICE_AUTH_VERIFY_REQUESTED';

export const deviceAuthOnline = () => async (dispatch, getState) => {
    try {
        const api = apiURL(getState());
        const result = await (await fetch(`${api}/auth`)).json();

        dispatch({type: DEVICE_AUTH_ONLINE, online: result.success});
    } catch (error) {
        dispatch({type: DEVICE_AUTH_ONLINE, online: false});
    }
};

export const deviceAuthRegister = (email, phone, country) => async (dispatch, getState) => {
    dispatch(deviceAuthLoading(true));
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

        console.log('result', result);
        if (result.success) {
            const {user: {id}, qr_code} = result;
            dispatch({type: DEVICE_AUTH_REGSITERED, id, qrCode: qr_code});
            dispatch(deviceAuthLogin());
        } else {
            dispatch({type: DEVICE_AUTH_ERROR, error: new Error(result.message.message || result.message)});
        }
        dispatch(deviceAuthLoading(false));
    } catch (error) {
        console.log('error', error);
        dispatch({type: DEVICE_AUTH_ERROR, error});
        dispatch(deviceAuthLoading(false));
    }
};

export const deviceAuthLogin = () => async (dispatch, getState) => {
    try {
        const api = apiURL(getState());
        const {id} = getState().deviceAuth;
        const result = await (await fetch(`${api}/auth/login?id=${id}`)).json();

        console.log('result', result);
        if (result.success) {
            dispatch({type: DEVICE_AUTH_VERIFY_REQUESTED});
        } else {
            dispatch({type: DEVICE_AUTH_ERROR, error: new Error(result.message.message || result.message)});
        }
    } catch (error) {
        console.log('error', error);
        dispatch({type: DEVICE_AUTH_ERROR, error});
    }
};

export const deviceAuthVerify = code => async (dispatch, getState) => {
    dispatch(deviceAuthLoading(true));

    try {
        const api = apiURL(getState());
        const {id} = getState().deviceAuth;
        const result = await (await fetch(`${api}/auth/verify?id=${id}&code=${code}`)).json();

        console.log('result', result);
        if (result.success) {
            dispatch({type: DEVICE_AUTH_VERIFY_SUCCESS});
        } else {
            dispatch({type: DEVICE_AUTH_VERIFY_FAIL});
            dispatch({type: DEVICE_AUTH_ERROR, error: new Error(result.message.message || result.message)});
        }
        dispatch(deviceAuthLoading(false));
    } catch (error) {
        console.log('error', error);
        dispatch({type: DEVICE_AUTH_ERROR, error});
        dispatch(deviceAuthLoading(false));
    }
};

export const deviceAuthLoading = value => ({type: DEVICE_AUTH_LOADING, value});

export const deviceAuthClear = () => ({type: DEVICE_AUTH_CLEAR});
