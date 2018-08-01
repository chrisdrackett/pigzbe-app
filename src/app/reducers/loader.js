import {
    LOADER_INITIALIZING,
    LOADER_LOADING,
    LOADER_ERROR,
    LOADER_MESSAGE
} from '../actions';

export const initialState = {
    initializing: true,
    loading: false,
    error: null,
    message: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOADER_INITIALIZING:
            return {
                ...state,
                initializing: action.value
            };
        case LOADER_LOADING:
            return {
                ...state,
                loading: action.value
            };
        case LOADER_ERROR:
            return {
                ...state,
                error: action.error
            };
        case LOADER_MESSAGE:
            return {
                ...state,
                message: action.message
            };
        default:
            return state;
    }
};
