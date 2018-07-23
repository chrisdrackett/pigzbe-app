import {BASE_CURRENCY} from '../constants';

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
    WOLLO_KEYPAIR,
    WOLLO_TEST_USER,
    WOLLO_KEYPAIR_SAVED
} from '../actions';

export const initialState = {
    useTestnet: false,
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
    publicKey: null,
    secretKey: null,
    // testUserKey: 'SBBZSQRKV4NDIKRVSXYL3T7NYKR3QP4X23VYGLEWYITFCKFN6Y4GY2PA',
    testUserKey: null,
    keysSaved: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case WOLLO_USE_TESTNET:
            return {
                ...state,
                useTestnet: action.useTestnet
            };
        case WOLLO_TEST_USER:
            return {
                ...state,
                testUserKey: action.testUserKey
            };
        case WOLLO_KEYPAIR:
            return {
                ...state,
                publicKey: action.keypair.publicKey(),
                secretKey: action.keypair.secret(),
                keysSaved: action.keysSaved
            };
        case WOLLO_KEYPAIR_SAVED:
            return {
                ...state,
                keysSaved: true
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
        default:
            return state;
    }
};
