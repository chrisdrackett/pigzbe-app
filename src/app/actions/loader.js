import wait from '../utils/wait';
import {
    authCheckTouchId,
    authTouchId,
    authKeychain,
    authLogin,
    authLoginKid,
    loadSettings,
    initializeConfig,
    loadConfig,
    loadKeys,
    loadWallet,
    loadMessages,
    loadExchange,
    loadKids,
    loadCustomTasks,
    loadKidsBalances
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
        dispatch(loaderMessage('Loading'));
        await dispatch(loadConfig());
        await dispatch(loadMessages());
        await dispatch(loadExchange());
    } catch (error) {
        console.log(error);
        dispatch(loaderError(error));
    }
    dispatch(loaderMessage(null));
    dispatch(loaderLoading(false));
};

export const loginAndLoad = passcode => async dispatch => {
    dispatch(loaderLoading(true));

    try {
        const success = await dispatch(authLogin(passcode));
        if (success) {
            await dispatch(loaderMessage('Loading'));
            await dispatch(loadConfig());
            await dispatch(loadKeys());
            await dispatch(loadWallet());
            await dispatch(loadMessages());
            await dispatch(loadExchange());
            // await dispatch(loadKids());
            await dispatch(loadKidsBalances());
        }
    } catch (error) {
        console.log(error);
        dispatch(loaderError(error));
    }
    dispatch(loaderMessage(null));
    dispatch(loaderLoading(false));
};

export const loginAndLoadKid = (kid, passcode) => async dispatch => {
    dispatch(loaderLoading(true));
    console.log('-- loginAndLoadKid --');

    try {
        const success = await dispatch(authLoginKid(kid, passcode));

        if (success) {
            await dispatch(loaderMessage('Loading'));
            await dispatch(loadConfig());
            await dispatch(loadExchange());
            await dispatch(loadKidsBalances(kid.address));
        }
    } catch (error) {
        console.log(error);
        dispatch(loaderError(error));
    }
    dispatch(loaderMessage(null));
    dispatch(loaderLoading(false));
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

export const initialize = () => async (dispatch, getState) => {
    if (!getState().loader.initializing) {
        return;
    }
    dispatch(initializing(true));
    dispatch(initializeConfig());
    await dispatch(loadSettings());
    await dispatch(loadKids());
    await dispatch(loadCustomTasks());
    await dispatch(authCheckTouchId());
    dispatch(tryTouchIdLogin());
    await wait(1);
    dispatch(initializing(false));
};
