import valueOrDefault from '../utils/value-or-default';
import {
    FAMILY_LOADING,
    FAMILY_LOAD,
    FAMILY_PARENT_NICKNAME,
    FAMILY_NUM_KIDS_TO_ADD,
    FAMILY_ADD_KID
} from '../actions';

export const initialState = {
    loading: false,
    parentNickname: '',
    numKidsToAdd: 0,
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
            };
        case FAMILY_ADD_KID:
            return {
                ...state,
                kids: state.kids.concat(action.kid),
            };
        default:
            return state;
    }
};
