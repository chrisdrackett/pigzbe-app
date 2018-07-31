import wait from '../utils/wait';
import {
    authTouchId,
    authKeychain,
    authLogin,
    // loadEscrow,
    loadSettings,
    initializeConfig,
    loadConfig,
    loadKeys,
    loadWallet,
    loadMessages,
    loadExchange
} from './';

export const LOADER_INITIALIZING = 'LOADER_INITIALIZING';
export const LOADER_LOADING = 'LOADER_LOADING';
export const LOADER_ERROR = 'LOADER_ERROR';
export const LOADER_MESSAGE = 'LOADER_MESSAGE';

const initializing = value => ({type: LOADER_INITIALIZING, value});

const loaderLoading = value => ({type: LOADER_LOADING, value});

const loaderError = error => ({type: LOADER_ERROR, error});

const loaderMessage = message => ({type: LOADER_MESSAGE, message});

export const loadContent = () => async dispatch => {
    dispatch(loaderLoading(true));

    try {
        await dispatch(loaderMessage('Loading Config'));
        await dispatch(loadConfig());
        await dispatch(loaderMessage('Loading Messages'));
        await dispatch(loadMessages());
        await dispatch(loaderMessage('Loading Exchange'));
        await dispatch(loadExchange());
        dispatch(loaderLoading(false));
    } catch (error) {
        console.log(error);
        dispatch(loaderError(error));
        dispatch(loaderLoading(false));
    }
};

export const loginAndLoad = passcode => async dispatch => {
    console.log('3. loginAndLoad passcode =', passcode);
    dispatch(loaderLoading(true));

    try {
        const success = await dispatch(authLogin(passcode));
        console.log('authLogin success =', success);
        if (success) {
            await dispatch(loaderMessage('Loading Config'));
            await dispatch(loadConfig());
            await dispatch(loadKeys());
            await dispatch(loaderMessage('Loading Wallet'));
            await dispatch(loadWallet());
            // await dispatch(loadEscrow());
            await dispatch(loaderMessage('Loading Messages'));
            await dispatch(loadMessages());
            await dispatch(loaderMessage('Loading Exchange'));
            await dispatch(loadExchange());
        }
        console.log('10. done loading');
        dispatch(loaderLoading(false));
    } catch (error) {
        console.log(error);
        dispatch(loaderError(error));
        dispatch(loaderLoading(false));
    }
};

export const tryTouchIdLogin = () => async (dispatch, getState) => {
    console.log('2. tryTouchIdLogin');
    const {enableTouchId} = getState().settings;
    // console.log('enableTouchId', enableTouchId);
    if (!enableTouchId) {
        return;
    }

    const passcode = await dispatch(authKeychain());
    if (!passcode) {
        return;
    }

    try {
        await dispatch(authTouchId());
        dispatch(loginAndLoad(passcode));
    } catch (error) {
        console.log(error);
    }
};

export const initialize = () => async dispatch => {
    console.log('1. initialize');
    dispatch(initializing(true));
    dispatch(initializeConfig());
    await dispatch(loadSettings());
    dispatch(tryTouchIdLogin());
    await wait(1);
    dispatch(initializing(false));
};
