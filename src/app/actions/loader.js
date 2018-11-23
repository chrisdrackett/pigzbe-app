import {STORAGE_KEY_SETTINGS} from 'app/constants';
import Storage from 'app/utils/storage';
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
    loadKidsActions,
    loadKidActions,
    loadCachedExchange,
} from './';

export const LOADER_INITIALIZING = 'LOADER_INITIALIZING';
export const LOADER_LOADING = 'LOADER_LOADING';
export const LOADER_ERROR = 'LOADER_ERROR';
export const LOADER_MESSAGE = 'LOADER_MESSAGE';
export const LOADER_ACCOUNT_EXISTS = 'LOADER_ACCOUNT_EXISTS';

const initializing = value => ({type: LOADER_INITIALIZING, value});

const loaderLoading = value => ({type: LOADER_LOADING, value});

const loaderError = error => ({type: LOADER_ERROR, error});

const loaderMessage = message => ({type: LOADER_MESSAGE, message});

export const loadContent = () => async dispatch => {
    dispatch(loaderLoading(true));

    try {
        dispatch(loaderMessage('Loading'));
        await dispatch(loadConfig());
    } catch (error) {
        console.log(error);
        dispatch(loaderError(error));
    }
    dispatch(loaderMessage(null));
    dispatch(loaderLoading(false));

    dispatch(loadExchange());
    dispatch(loadMessages());
};

export const loginAndLoad = passcode => async dispatch => {
    dispatch(loaderLoading(true));

    try {
        const success = await dispatch(authLogin(passcode));
        if (success) {
            await dispatch(loaderMessage('Loading'));
            await dispatch(loadKeys());
            await dispatch(loadWallet());
            await dispatch(loadKidsActions());
            await dispatch(loadCustomTasks());
            dispatch(loadMessages());
        }
    } catch (error) {
        console.log(error);
        dispatch(loaderError(error));
    }
    dispatch(loaderMessage(null));
    dispatch(loaderLoading(false));
    dispatch(loadMessages());
};

export const loginAndLoadKid = (kid, passcode) => async dispatch => {
    dispatch(loaderLoading(true));
    console.log('-- loginAndLoadKid --');

    try {
        const success = await dispatch(authLoginKid(kid, passcode));

        if (success) {
            await dispatch(loaderMessage('Loading'));
            await dispatch(loadKeys());
            await dispatch(loadCustomTasks());
            await dispatch(loadKidActions(kid));
        }
    } catch (error) {
        console.log(error);
        dispatch(loaderError(error));
    }
    dispatch(loaderMessage(null));
    dispatch(loaderLoading(false));
};

export const tryTouchIdLogin = () => async (dispatch, getState) => {
    try {
        const {enableTouchId} = getState().settings;
        if (!enableTouchId) {
            return false;
        }

        const passcode = await dispatch(authKeychain());
        if (!passcode) {
            return false;
        }

        await dispatch(authTouchId());
        dispatch(loginAndLoad(passcode));
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
};

export const checkAccountExists = () => async dispatch => {
    const hasPasscode = !!await dispatch(authKeychain());
    const hasStorage = await Storage.hasItem(STORAGE_KEY_SETTINGS);
    console.log('checkAccountExists');
    console.log('  hasPasscode', hasPasscode);
    console.log('  hasStorage', hasStorage);
    const value = hasPasscode && hasStorage;
    dispatch({type: LOADER_ACCOUNT_EXISTS, value});
};

export const initialize = () => async (dispatch, getState) => {
    console.log('===> initialize');
    if (!getState().loader.initializing) {
        return true;
    }
    dispatch(initializing(true));
    dispatch(initializeConfig());
    await dispatch(loadConfig());
    await dispatch(loadSettings());
    await dispatch(loadKids());
    await dispatch(authCheckTouchId());
    await dispatch(loadCachedExchange());
    await dispatch(checkAccountExists());
    dispatch(initializing(false));
    return true;
};
