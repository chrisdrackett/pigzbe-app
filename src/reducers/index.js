import {combineReducers} from 'redux';

import {
    AUTH_LOGIN_START,
    AUTH_LOGIN_FAIL,
    AUTH_LOGIN,
    AUTH_LOGOUT,
    UPDATE_BALANCE
} from '../actions';

const initialAuthState = {
    isLoggingIn: false,
    isLoggedIn: false,
    error: null
};

function auth(state = initialAuthState, action) {
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
            return {...state, isLoggedIn: false};
        default:
            return state;
    }
}

const initialStellarState = {balance: '0'};

function stellar(state = initialStellarState, action) {
    switch (action.type) {
        case UPDATE_BALANCE:
            return {...state, balance: action.balance};
        default:
            return state;
    }
}

export default combineReducers({
    auth,
    stellar
});
