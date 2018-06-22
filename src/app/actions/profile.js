import Storage from '../utils/storage';
import {apiURL} from '../selectors';

const storageKey = 'profile';

export const PROFILE_LOADING = 'PROFILE_LOADING';
export const PROFILE_UPDATE = 'PROFILE_UPDATE';
export const PROFILE_AVAILABLE = 'PROFILE_AVAILABLE';
export const PROFILE_CLEAR = 'PROFILE_CLEAR';

export const profileLoading = value => ({type: PROFILE_LOADING, value});

export const profileLoad = () => async dispatch => {
    dispatch(profileLoading(true));
    try {
        const data = await Storage.load(storageKey);
        dispatch({type: PROFILE_UPDATE, ...data});
        dispatch(profileAvailable(!!data.name));
    } catch (error) {}
    dispatch(profileLoading(false));
};

const profileToggleSubscribe = async ({api, email, subscribe}) => {
    try {
        const values = await (await fetch(`${api}/email/${subscribe ? 'subscribe' : 'unsubscribe'}`, {
            method: 'POST',
            body: JSON.stringify({
                email
            })
        })).json();

        return values;
    } catch (e) {
        return false;
    }
};

export const profileUpdate = data => async (dispatch, getState) => {
    try {
        const api = apiURL(getState());
        await profileToggleSubscribe({api, email: data.email, subscribe: data.subscribe});
        dispatch({type: PROFILE_UPDATE, ...data});
        return Storage.save(storageKey, data);
    } catch (e) {
        console.log(e);
        return null;
    }

};

export const profileAvailable = value => ({type: PROFILE_AVAILABLE, value});

export const profileClear = () => dispatch => {
    dispatch(profileAvailable(false));
    return Storage.clear(storageKey);
};
