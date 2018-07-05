import {
    authTouchId,
    authKeychain,
    authLogin,
    profileLoad,
    messagesLoad,
    loadEscrow
} from './';

const pkg = require('../../../package.json');

export const LOADER_LOADING = 'LOADER_LOADING';
export const LOADER_ERROR = 'LOADER_ERROR';

const loading = value => ({type: LOADER_LOADING, value});

export const loaderError = error => ({type: LOADER_ERROR, error});

export const load = passcode => dispatch => {
    dispatch(loading(true));
    return dispatch(authLogin(passcode))
        .then(() => dispatch(profileLoad()))
        .then(() => dispatch(loadEscrow()))
        .then(() => dispatch(messagesLoad()))
        .then(() => dispatch(loading(false)))
        .catch(error => {
            console.log(error);
            dispatch(loaderError(error));
            dispatch(loading(false));
        });
};

export const tryAutoLoad = () => dispatch => {
    console.log('tryAutoLoad');
    dispatch(authKeychain())
        .then(passcode => {
            if (passcode) {
                dispatch(authTouchId())
                    .then(() => dispatch(load(passcode)))
                    .catch(error => console.log(error));
            }
        });
};

export const loadContent = query => () => {
    const {space, accessToken} = pkg.contentful;
    return fetch(`https://cdn.contentful.com/spaces/${space}/entries?access_token=${accessToken}&${query}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json());
};
