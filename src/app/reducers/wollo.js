import {USE_TESTNET, BASE_CURRENCY} from '../constants';

import {
    WOLLO_USE_TESTNET,
    WOLLO_UPDATE_ACCOUNT,
    WOLLO_UPDATE_BALANCE
} from '../actions';

export const initialState = {
    useTestnet: USE_TESTNET,
    balance: '0',
    baseCurrency: BASE_CURRENCY
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
        default:
            return state;
    }
};
