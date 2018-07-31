import {apiURL} from '../selectors';
import Storage from '../utils/storage';
import {STORAGE_KEY_SETTINGS} from '../constants';

export const SETTINGS_UPDATE = 'SETTINGS_UPDATE';
export const SETTINGS_CLEAR = 'SETTINGS_CLEAR';

export const loadSettings = () => async dispatch => {
    console.log('1b. loadSettings');
    try {
        const data = await Storage.load(STORAGE_KEY_SETTINGS);
        console.log(JSON.stringify(data, null, 2));
        dispatch({type: SETTINGS_UPDATE, ...data});
    } catch (error) {
        console.log(error);
    }
};

export const settingsSave = () => async (dispatch, getState) => {
    try {
        const data = getState().settings;
        await Storage.save(STORAGE_KEY_SETTINGS, data);
    } catch (error) {
        console.log(error);
    }
};

export const settingsUpdate = data => async (dispatch) => {
    try {
        dispatch({type: SETTINGS_UPDATE, ...data});
        await dispatch(settingsSave());
    } catch (error) {
        console.log(error);
    }
};

export const settingsFirstTime = () => dispatch => {
    dispatch(settingsUpdate({firstTime: false}));
};

export const settingsEnableTouchId = value => dispatch => {
    dispatch(settingsUpdate({enableTouchId: value}));
};

export const settingsToggleSubscribe = subscribe => async (dispatch, getState) => {
    try {
        dispatch(settingsUpdate({subscribe}));
        const api = apiURL(getState());
        const {email} = getState().settings;
        await (await fetch(`${api}/email/${subscribe ? 'subscribe' : 'unsubscribe'}`, {
            method: 'POST',
            body: JSON.stringify({email})
        })).json();
    } catch (e) {
        console.log(e);
        dispatch(settingsUpdate({subscribe: !subscribe}));
    }
};

export const settingsClear = () => () => {
    return Storage.clear(STORAGE_KEY_SETTINGS);
};
