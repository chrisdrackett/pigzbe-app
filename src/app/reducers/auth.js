import {
    AUTH_CREATE,
    AUTH_LOGIN_START,
    AUTH_LOGIN_FAIL,
    AUTH_LOGIN,
    AUTH_LOGOUT
} from '../actions';

export const initialState = {
    passcode: null,
    isLoggingIn: false,
    isLoggedIn: false,
    error: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case AUTH_CREATE:
            return {
                ...state,
                passcode: action.passcode
            };
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
