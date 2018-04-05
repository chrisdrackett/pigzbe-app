import {combineReducers} from 'redux';

import {
    AUTH_LOGIN,
    AUTH_LOGOUT,
    UPDATE_BALANCE
} from '../actions';

const initialAuthState = {isLoggedIn: false};

function auth(state = initialAuthState, action) {
    switch (action.type) {
        case AUTH_LOGIN:
            return {...state, isLoggedIn: true};
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
