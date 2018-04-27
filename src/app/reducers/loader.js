import {
    LOADER_LOADING
} from '../actions';

export const initialState = {
    isLoading: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOADER_LOADING:
            return {
                ...state,
                isLoading: action.value
            };
        default:
            return state;
    }
};
