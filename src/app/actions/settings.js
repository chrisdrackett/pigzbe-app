import Storage from '../utils/storage';
import {STORAGE_KEY_SETTINGS} from '../constants';

export const SETTINGS_ENABLE_TOUCH_ID = 'SETTINGS_ENABLE_TOUCH_ID';
export const SETTINGS_UPDATE = 'SETTINGS_UPDATE';
export const SETTINGS_CLEAR = 'SETTINGS_CLEAR';

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

export const settingsUpdate = data => async (dispatch) => {
    try {
        dispatch({type: SETTINGS_UPDATE, ...data});
        await Storage.save(STORAGE_KEY_SETTINGS, data);
    } catch (e) {
        console.log(e);
    }
};

export const settingsEnableTouchId = value => ({type: SETTINGS_ENABLE_TOUCH_ID, value});

// const toggleSubscribe = async ({api, email, subscribe}) => {
//     try {
//         const values = await (await fetch(`${api}/email/${subscribe ? 'subscribe' : 'unsubscribe'}`, {
//             method: 'POST',
//             body: JSON.stringify({
//                 email
//             })
//         })).json();
//
//         return values;
//     } catch (e) {
//         return false;
//     }
// };

// export const settingsUpdate = data => async (dispatch, getState) => {
//     try {
//         const api = apiURL(getState());
//         await toggleSubscribe({api, email: data.email, subscribe: data.subscribe});
//         dispatch({type: PROFILE_UPDATE, ...data});
//         return Storage.save(storageKey, data);
//     } catch (e) {
//         console.log(e);
//         return null;
//     }
//
// };
