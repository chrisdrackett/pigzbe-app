import {EXCHANGE_LOAD} from '../actions/exchange';

const initialState = {
    exchange: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case EXCHANGE_LOAD:
            return {
                ...state,
                exchange: action.payload.exchange,
            };

        default:
            return state;
    }
};
