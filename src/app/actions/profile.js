import {load, save, clear} from '../utils/storage';
import apiURL from '../utils/api-url';
// import wait from './wait';

const storageKey = 'profile';

export const PROFILE_LOADING = 'PROFILE_LOADING';
export const PROFILE_UPDATE = 'PROFILE_UPDATE';
export const PROFILE_AVAILABLE = 'PROFILE_AVAILABLE';
export const PROFILE_CLEAR = 'PROFILE_CLEAR';

export const profileLoading = value => ({type: PROFILE_LOADING, value});

export const profileLoad = () => dispatch => {
    dispatch(profileLoading(true));
    return load(storageKey)
        // .then(data => wait(0.5, data))
        .then(data => {
            dispatch({type: PROFILE_UPDATE, ...data});
            dispatch(profileAvailable(!!data.name));
        })
        .then(() => dispatch(profileLoading(false)));
};

const profileToggleSubscribe = async ({email, subscribe}) => {
    try {
        const values = await (await fetch(`${apiURL()}/email/${subscribe ? 'subscribe' : 'unsubscribe'}`, {
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

export const profileUpdate = data => async (dispatch) => {
    try {
        await profileToggleSubscribe({email: data.email, subscribe: data.subscribe});
        dispatch({type: PROFILE_UPDATE, ...data});
        return save(storageKey, data);
    } catch (e) {
        console.log(e);
        return null;
    }

};

export const profileAvailable = value => ({type: PROFILE_AVAILABLE, value});

export const profileClear = () => dispatch => {
    dispatch(profileAvailable(false));
    return clear(storageKey);
};
