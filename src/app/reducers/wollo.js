import {USE_TESTNET} from '../constants';

import {
    WOLLO_USE_TESTNET,
    WOLLO_UPDATE_ACCOUNT,
    WOLLO_UPDATE_BALANCE,
    WOLLO_SET_ESCROW
} from '../actions';

export const initialState = {
    useTestnet: USE_TESTNET,
    balance: '0',
    escrow: null
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
        case WOLLO_SET_ESCROW:
            return {
                ...state,
                escrow: action.escrow
            };
        default:
            return state;
    }
};
