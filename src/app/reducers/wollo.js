import {
    UPDATE_ACCOUNT,
    UPDATE_BALANCE
} from '../actions';

export const initialState = {
    balance: '0'
};

export default (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_ACCOUNT:
            return {
                ...state,
                account: action.account
            };
        case UPDATE_BALANCE:
            return {
                ...state,
                balance: action.balance
            };
        default:
            return state;
    }
};
