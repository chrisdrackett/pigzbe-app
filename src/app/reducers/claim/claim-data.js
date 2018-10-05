import {
    CLAIM_UPDATE_DATA,
    CLAIM_CLEAR_DATA,
} from '../../actions/claim-data';

const initialState = {};

export default (state = initialState, action) => {
    switch (action.type) {
        case CLAIM_UPDATE_DATA:
            return {
                ...state,
                ...action.payload
            };
        case CLAIM_CLEAR_DATA:
            return {};
        default:
            return state;
    }
};
