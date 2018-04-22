import {
    AUTH_LOGIN_START,
    AUTH_LOGIN_FAIL,
    AUTH_LOGIN,
    AUTH_LOGOUT
} from '../actions';

const initialState = {
    isLoggingIn: false,
    isLoggedIn: false,
    error: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case AUTH_LOGIN_START:
            return {
                ...state,
                isLoggingIn: true,
                error: null
            };
        case AUTH_LOGIN_FAIL:
            return {
                ...state,
                isLoggingIn: false,
                error: action.error
            };
        case AUTH_LOGIN:
            return {
                ...state,
                isLoggingIn: false,
                isLoggedIn: true,
                publicKey: action.keypair.publicKey(),
                secretKey: action.keypair.secret()
            };
        case AUTH_LOGOUT:
            return {
                ...state,
                isLoggedIn: false
            };
        default:
            return state;
    }
};
