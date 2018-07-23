import {
    authTouchId,
    authKeychain,
    authLogin,
    profileLoad,
    messagesLoad,
    // loadEscrow,
    // loadWallet
    loadKeys
} from './';

const pkg = require('../../../package.json');

export const LOADER_LOADING = 'LOADER_LOADING';
export const LOADER_ERROR = 'LOADER_ERROR';

const loading = value => ({type: LOADER_LOADING, value});

export const loaderError = error => ({type: LOADER_ERROR, error});

export const load = passcode => async dispatch => {
    console.log('====> load', passcode);
    dispatch(loading(true));

    try {
        // await dispatch(initWeb3());
        await dispatch(authLogin(passcode));
        await dispatch(loadKeys());
        // await dispatch(loadWallet());
        // await dispatch(loadEscrow());
        await dispatch(messagesLoad());
        await dispatch(profileLoad());
        dispatch(loading(false));
    } catch (error) {
        console.log(error);
        dispatch(loaderError(error));
        dispatch(loading(false));
    }
};

// export const load = passcode => dispatch => {
//     dispatch(loading(true));
//     return dispatch(authLogin(passcode))
//         .then(() => dispatch(loadWallet()))
//         .then(() => dispatch(profileLoad()))
//         .then(() => dispatch(loadEscrow()))
//         .then(() => dispatch(messagesLoad()))
//         .then(() => dispatch(loading(false)))
//         .catch(error => {
//             console.log(error);
//             dispatch(loaderError(error));
//             dispatch(loading(false));
//         });
// };

export const tryAutoLoad = () => async dispatch => {
    const passcode = await dispatch(authKeychain());
    if (!passcode) {
        return;
    }

    try {
        await dispatch(authTouchId());
        dispatch(load(passcode));
    } catch (error) {
        console.log(error);
    }
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
