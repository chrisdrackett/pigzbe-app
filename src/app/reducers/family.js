import valueOrDefault from '../utils/value-or-default';
import {
    FAMILY_LOADING,
    FAMILY_LOAD,
    FAMILY_PARENT_NICKNAME,
    FAMILY_NUM_CHILDREN_TO_ADD,
    FAMILY_ADD_CHILD
} from '../actions';

export const initialState = {
    loading: false,
    parentNickname: '',
    numChildrenToAdd: 0,
    children: [],
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
        case FAMILY_NUM_CHILDREN_TO_ADD:
            return {
                ...state,
                numChildrenToAdd: action.numChildrenToAdd,
            };
        case FAMILY_ADD_CHILD:
            return {
                ...state,
                children: state.children.concat(action.child),
            };
        default:
            return state;
    }
};
