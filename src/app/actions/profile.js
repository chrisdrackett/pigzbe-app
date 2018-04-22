import {load, save, clear} from '../utils/storage';
import wait from './wait';

export const PROFILE_LOADING = 'PROFILE_LOADING';
export const PROFILE_UPDATE = 'PROFILE_UPDATE';
export const PROFILE_AVAILABLE = 'PROFILE_AVAILABLE';
export const PROFILE_CLEAR = 'PROFILE_CLEAR';

export const profileLoading = value => ({type: PROFILE_LOADING, value});

export const profileLoad = () => dispatch => {
    dispatch(profileLoading(true));
    return load()
        .then(data => wait(0.5, data))
        .then(data => {
            dispatch({type: PROFILE_UPDATE, ...data});
            dispatch(profileAvailable(!!data.name));
        })
        .then(() => dispatch(profileLoading(false)));
};

export const profileUpdate = data => dispatch => {
    dispatch({type: PROFILE_UPDATE, ...data});
    return save(data);
};

export const profileAvailable = value => ({type: PROFILE_AVAILABLE, value});

export const profileClear = () => dispatch => {
    dispatch(profileAvailable(false));
    return clear();
};
