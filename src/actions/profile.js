import {load, save, clear} from '../storage';

export const PROFILE_LOADING = 'PROFILE_LOADING';
export const PROFILE_UPDATE = 'PROFILE_UPDATE';
export const PROFILE_AVAILABLE = 'PROFILE_AVAILABLE';
export const PROFILE_CLEAR = 'PROFILE_CLEAR';

// const wait = (time, value) => new Promise(resolve => setTimeout(() => resolve(value), time * 1000));

export const profileLoading = value => ({type: PROFILE_LOADING, value});

export const profileLoad = () => dispatch => {
    dispatch(profileLoading(true));
    return load()
        .then(data => {
            dispatch({type: PROFILE_UPDATE, ...data});
            dispatch(profileAvailable(!!data.name));
        })
        .then(() => dispatch(profileLoading(false)));
};

export const profileUpdate = data => dispatch => {
    dispatch({type: PROFILE_UPDATE, ...data});
    // return wait(1, true);
    return save(data);
};

export const profileAvailable = value => ({type: PROFILE_AVAILABLE, value});

export const profileClear = () => dispatch => {
    dispatch(profileAvailable(false));
    // return wait(1, true);
    return clear();
};
