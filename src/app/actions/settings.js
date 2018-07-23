import Storage from '../utils/storage';
import {STORAGE_KEY_SETTINGS} from '../constants';

export const SETTINGS_ENABLE_TOUCH_ID = 'SETTINGS_ENABLE_TOUCH_ID';
export const SETTINGS_UPDATE = 'SETTINGS_UPDATE';
export const SETTINGS_CLEAR = 'SETTINGS_CLEAR';

export const settingsEnableTouchId = value => ({type: SETTINGS_ENABLE_TOUCH_ID, value});

export const settingsLoad = () => async dispatch => {
    try {
        const data = await Storage.load(STORAGE_KEY_SETTINGS);
        console.log('settingsLoad data', data);
        dispatch({type: SETTINGS_UPDATE, ...data});
    } catch (error) {
        console.log(error);
    }
};

export const settingsClear = () => () => {
    return Storage.clear(STORAGE_KEY_SETTINGS);
};
