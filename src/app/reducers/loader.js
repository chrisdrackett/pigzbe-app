import {
    LOADER_INITIALIZING,
    LOADER_LOADING,
    LOADER_ERROR,
    LOADER_MESSAGE,
    LOADER_ACCOUNT_EXISTS
} from '../actions';

export const initialState = {
    initializing: true,
    loading: false,
    accountExists: false,
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
        case LOADER_ACCOUNT_EXISTS:
            return {
                ...state,
                accountExists: action.value
            };
        default:
            return state;
    }
};
