import {BASE_CURRENCY} from '../constants';
import Config from 'react-native-config';

import {
    WOLLO_LOADING,
    WOLLO_ERROR,
    WOLLO_USE_TESTNET,
    WOLLO_UPDATE_ACCOUNT,
    WOLLO_UPDATE_BALANCE,
    WOLLO_UPDATE_PAYMENTS,
    WOLLO_SENDING,
    WOLLO_SEND_COMPLETE,
    WOLLO_SEND_STATUS,
    WOLLO_UPDATE_XLM,
    WOLLO_UPDATE_ISSUER
} from '../actions';

export const initialState = {
    useTestnet: Config.STELLAR_USE_TESTNET,
    balance: '0',
    balanceXLM: '0',
    minXLM: '0',
    hasGas: false,
    baseCurrency: BASE_CURRENCY,
    payments: [],
    loading: false,
    error: null,
    sending: false,
    sendStatus: null,
    sendComplete: false,
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
        case WOLLO_LOADING:
            return {
                ...state,
                loading: action.loading
            };
        case WOLLO_ERROR:
            return {
                ...state,
                error: action.error
            };
        case WOLLO_SENDING:
            return {
                ...state,
                sending: action.sending
            };
        case WOLLO_SEND_STATUS:
            return {
                ...state,
                sendStatus: action.sendStatus
            };
        case WOLLO_SEND_COMPLETE:
            return {
                ...state,
                sendComplete: action.sendComplete
            };
        case WOLLO_SENDING:
            return {
                ...state,
                sending: action.sending
            };
        case WOLLO_UPDATE_XLM:
            return {
                ...state,
                balanceXLM: action.balanceXLM,
                minXLM: action.minXLM,
                hasGas: action.hasGas
            };
        case WOLLO_UPDATE_ISSUER:
            return {
                ...state,
                issuer: action.issuer
            };
        default:
            return state;
    }
};
