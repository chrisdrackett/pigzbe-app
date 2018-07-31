import wait from '../utils/wait';
import {
    authCheckTouchId,
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
        dispatch(loaderMessage('Loading Config'));
        await dispatch(loadConfig());
        dispatch(loaderMessage('Loading Messages'));
        await dispatch(loadMessages());
        dispatch(loaderMessage('Loading Values'));
        await dispatch(loadExchange());
        dispatch(loaderMessage(null));
        dispatch(loaderLoading(false));
    } catch (error) {
        console.log(error);
        dispatch(loaderError(error));
        dispatch(loaderLoading(false));
    }
};

export const loginAndLoad = passcode => async dispatch => {
    dispatch(loaderLoading(true));

    try {
        const success = await dispatch(authLogin(passcode));
        if (success) {
            await dispatch(loaderMessage('Loading Config'));
            await dispatch(loadConfig());
            await dispatch(loadKeys());
            await dispatch(loaderMessage('Loading Wallet'));
            await dispatch(loadWallet());
            // await dispatch(loadEscrow());
            await dispatch(loaderMessage('Loading Messages'));
            await dispatch(loadMessages());
            await dispatch(loaderMessage('Loading Values'));
            await dispatch(loadExchange());
        }
        dispatch(loaderLoading(false));
    } catch (error) {
        console.log(error);
        dispatch(loaderError(error));
        dispatch(loaderLoading(false));
    }
};

export const tryTouchIdLogin = () => async (dispatch, getState) => {
    const {enableTouchId} = getState().settings;
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
    dispatch(initializing(true));
    dispatch(initializeConfig());
    await dispatch(loadSettings());
    await dispatch(authCheckTouchId());
    dispatch(tryTouchIdLogin());
    await wait(1);
    dispatch(initializing(false));
};
