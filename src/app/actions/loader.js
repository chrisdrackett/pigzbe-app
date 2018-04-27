import {
    authLogin,
    profileLoad,
    messagesLoad
} from './';

export const LOADER_LOADING = 'LOADER_LOADING';

const loading = value => ({type: LOADER_LOADING, value});

export const load = key => dispatch => {
    dispatch(loading(true));
    return dispatch(authLogin(key))
        .then(() => dispatch(profileLoad()))
        .then(() => dispatch(messagesLoad()))
        .catch(error => console.error(error))
        .finally(() => dispatch(loading(false)));
};
