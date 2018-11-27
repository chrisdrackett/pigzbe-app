import {
    WALLET_LOADING,
    WALLET_ERROR,
    WALLET_UPDATE_ACCOUNT,
    WALLET_UPDATE_BALANCE,
    WALLET_UPDATE_PAYMENTS,
    WALLET_SENDING,
    WALLET_SEND_COMPLETE,
    WALLET_SEND_STATUS,
    WALLET_UPDATE_XLM,
    WALLET_SEND_RESET,
    WALLET_SET_SELECTED_TOKEN
} from '../actions';

import {ASSET_CODE} from 'app/constants';

export const initialState = {
    balances: {XLM: '0', WLO: '0'},
    selectedToken: ASSET_CODE,
    minXLM: '0',
    hasGas: false,
    payments: [],
    loading: false,
    error: null,
    sending: false,
    sendStatus: null,
    sendComplete: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case WALLET_UPDATE_ACCOUNT:
            return {
                ...state,
                account: action.account
            };
        case WALLET_UPDATE_BALANCE:
            return {
                ...state,
                balances: {
                    ...state.balances,
                    WLO: action.balance,
                }
            };
        case WALLET_UPDATE_PAYMENTS:
            return {
                ...state,
                payments: action.payments
            };
        case WALLET_LOADING:
            return {
                ...state,
                loading: action.loading
            };
        case WALLET_ERROR:
            return {
                ...state,
                error: action.error
            };
        case WALLET_SENDING:
            return {
                ...state,
                sending: action.sending
            };
        case WALLET_SEND_STATUS:
            return {
                ...state,
                sendStatus: action.sendStatus
            };
        case WALLET_SEND_COMPLETE:
            return {
                ...state,
                sendComplete: action.sendComplete
            };
        case WALLET_SENDING:
            return {
                ...state,
                sending: action.sending
            };
        case WALLET_SEND_RESET:
            return {
                ...state,
                sending: false,
                error: null,
                sendComplete: false,
                sendStatus: null,
            };
        case WALLET_UPDATE_XLM:
            return {
                ...state,
                minXLM: action.minBalance,
                hasGas: action.hasGas,
                balances: {
                    ...state.balances,
                    XLM: action.balance,
                }
            };
        case WALLET_SET_SELECTED_TOKEN:
            return {
                ...state,
                selectedToken: action.code
            };
        default:
            return state;
    }
};
