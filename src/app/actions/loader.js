import {
    authTouchId,
    authKeychain,
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

export const tryAutoLoad = () => dispatch => {
    console.log('tryAutoLoad');
    dispatch(authKeychain())
        .then(key => {
            if (key) {
                dispatch(authTouchId())
                    .then(() => dispatch(load(key)))
                    .catch(error => console.log(error));
            }
        });
};
