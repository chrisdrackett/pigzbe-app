import {
    AUTH_CREATE,
    AUTH_LOGIN_START,
    AUTH_LOGIN_FAIL,
    AUTH_LOGIN,
    AUTH_LOGOUT,
    AUTH_TEST_USER
} from '../actions';

export const initialState = {
    passcode: null,
    isLoggingIn: false,
    isLoggedIn: false,
    error: null,
    publicKey: null,
    secretKey: null,
    testUserKey: null,
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
                // publicKey: action.keypair.publicKey(),
                // secretKey: action.keypair.secret()
            };
        case AUTH_LOGOUT:
            return {
                ...state,
                isLoggedIn: false
            };
        case AUTH_TEST_USER:
            return {
                ...state,
                testUserKey: action.testUserKey
            };
        default:
            return state;
    }
};
