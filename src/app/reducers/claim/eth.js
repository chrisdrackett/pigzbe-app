import {
    CLAIM_ETH_PRIVATE_KEY,
    CLAIM_ETH_COINBASE,
    CLAIM_ETH_BALANCE,
} from '../../actions/claim-eth';

import {
    CLAIM_CLEAR_DATA,
} from '../../actions/claim-data';

const initialState = {
    coinbase: null,
    balanceWei: null,
    balanceWollo: null,
    privateKey: null,
    maxAmount: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case CLAIM_ETH_PRIVATE_KEY:
            return {
                ...state,
                privateKey: action.privateKey
            };
        case CLAIM_ETH_BALANCE:
            return {
                ...state,
                balanceWei: action.payload.balanceWei,
                balanceWollo: action.payload.balanceWollo,
                maxAmount: action.payload.maxAmount,
            };
        case CLAIM_ETH_COINBASE:
            return {
                ...state,
                coinbase: action.coinbase,
            };
        case CLAIM_CLEAR_DATA:
            return {
                ...state,
                ...initialState
            };
        default:
            return state;
    }
};
