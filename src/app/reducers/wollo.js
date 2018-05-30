import {USE_TESTNET, BASE_CURRENCY} from '../constants';

import {
    WOLLO_SET_LOADING,
    WOLLO_SET_ERROR,
    WOLLO_USE_TESTNET,
    WOLLO_UPDATE_ACCOUNT,
    WOLLO_UPDATE_BALANCE,
    WOLLO_UPDATE_PAYMENTS
} from '../actions';

export const initialState = {
    useTestnet: USE_TESTNET,
    balance: '0',
    baseCurrency: BASE_CURRENCY,
    payments: [],
    loading: false,
    error: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case WOLLO_USE_TESTNET:
            return {
                ...state,
                useTestnet: action.useTestnet
            };
        case WOLLO_UPDATE_ACCOUNT:
            return {
                ...state,
                account: action.account
            };
        case WOLLO_UPDATE_BALANCE:
            return {
                ...state,
                balance: action.balance
            };
        case WOLLO_UPDATE_PAYMENTS:
            return {
                ...state,
                payments: action.payments
            };
        case WOLLO_SET_LOADING:
            return {
                ...state,
                loading: action.loading
            };
        case WOLLO_SET_ERROR:
            return {
                ...state,
                error: action.error
            };
        default:
            return state;
    }
};
