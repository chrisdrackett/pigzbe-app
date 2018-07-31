import {APP_CONNECTION_STATUS, APP_ERROR} from '../actions';
import isDesktop from '../utils/is-desktop';

const initialState = {
    isConnected: isDesktop,
    error: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case APP_CONNECTION_STATUS:
            return {
                ...state,
                isConnected: action.isConnected
            };
        case APP_ERROR:
            return {
                ...state,
                error: action.error
            };
        default:
            return state;
    }
};
