import {APP_CONNECTION_STATUS, APP_ADD_ALERT, APP_DELETE_ALERT} from '../actions';
import isDesktop from '../utils/is-desktop';

const initialState = {
    isConnected: isDesktop,
    alertType: null,
    alertMessage: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case APP_CONNECTION_STATUS:
            return {
                ...state,
                isConnected: action.isConnected
            };
        case APP_ADD_ALERT:
            return {
                ...state,
                alertType: action.alertType,
                alertMessage: action.alertMessage,
            };
        case APP_DELETE_ALERT:
            return {
                ...state,
                alertType: null,
                alertMessage: null,
            };
        default:
            return state;
    }
};
