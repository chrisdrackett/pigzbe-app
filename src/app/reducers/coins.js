import {EXCHANGE_LOAD} from '../actions/coins';

const initialState = {
    error: null,
    exchange: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case EXCHANGE_LOAD:
            return {
                ...state,
                error: action.payload.error,
                exchange: action.payload.exchange,
            };

        default:
            return state;
    }
};
