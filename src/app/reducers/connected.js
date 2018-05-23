import {CHANGE_CONNECTION_STATUS} from '../actions/check-connection';
import isDesktop from '../utils/is-desktop';

const initialState = {
    isConnected: isDesktop,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_CONNECTION_STATUS:
            return {
                ...state,
                isConnected: action.isConnected
            };

        default:
            return state;
    }
};
