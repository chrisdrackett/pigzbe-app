import {
    LOADER_LOADING,
    LOADER_ERROR
} from '../actions';

export const initialState = {
    isLoading: false,
    error: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOADER_LOADING:
            return {
                ...state,
                isLoading: action.value
            };
        case LOADER_ERROR:
            return {
                ...state,
                error: action.error
            };
        default:
            return state;
    }
};
