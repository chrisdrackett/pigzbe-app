import {
    UPDATE_BALANCE
} from '../actions';

const initialState = {
    balance: '0'
};

export default (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_BALANCE:
            return {
                ...state,
                balance: action.balance
            };
        default:
            return state;
    }
};
