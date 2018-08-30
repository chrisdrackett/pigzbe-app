import valueOrDefault from '../utils/value-or-default';
import {
    FAMILY_LOADING,
    FAMILY_LOAD,
    FAMILY_PARENT_NICKNAME,
    FAMILY_NUM_KIDS_TO_ADD,
    FAMILY_ADD_KID,
    FAMILY_BALANCE_UPDATE
} from '../actions';

export const initialState = {
    loading: false,
    parentNickname: '',
    numKidsToAdd: 0,
    numKidsAdded: 0,
    kids: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case FAMILY_LOADING:
            return {
                ...state,
                loading: action.value
            };
        case FAMILY_LOAD:
            return Object.keys(initialState).reduce((ob, key) => {
                ob[key] = valueOrDefault(action[key], state[key]);
                return ob;
            }, {});
        case FAMILY_PARENT_NICKNAME:
            return {
                ...state,
                parentNickname: action.parentNickname,
            };
        case FAMILY_NUM_KIDS_TO_ADD:
            return {
                ...state,
                numKidsToAdd: action.numKidsToAdd,
                numKidsAdded: 0,
            };
        case FAMILY_ADD_KID:
            return {
                ...state,
                kids: state.kids.concat(action.kid),
                numKidsToAdd: state.numKidsToAdd - 1,
                numKidsAdded: state.numKidsAdded + 1,
            };
        case FAMILY_BALANCE_UPDATE:
            return {
                ...state,
                kids: state.kids.map(k => {
                    if (k.address === action.address) {
                        return {
                            ...k,
                            balance: action.balance
                        };
                    }
                    return k;
                }),
            };
        default:
            return state;
    }
};