import {
    CLAIM_BURNED,
} from '../../actions/claim-contract';

import {
    CLAIM_CLEAR_DATA,
} from '../../actions/claim-data';

import {
    CLAIM_TRANSFER,
    CLAIM_LOADING,
    CLAIM_ERROR,
} from '../../actions/claim-api';

const initialState = {
    activity: [],
    // claim: null,
    transfer: null,
    loading: null,
    error: null,
    transactionHash: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case CLAIM_BURNED:
            return {
                ...state,
                transactionHash: action.transactionHash
            };
        case CLAIM_ERROR:
            return {
                ...state,
                error: action.payload
            };
        case CLAIM_LOADING:
            return {
                ...state,
                loading: action.payload
            };
        // case CLAIM_CLAIM:
        //     return {
        //         ...state,
        //         claim: action.payload
        //     };
        case CLAIM_TRANSFER:
            return {
                ...state,
                transfer: action.payload
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
