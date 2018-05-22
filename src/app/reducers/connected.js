import {CHANGE_CONNECTION_STATUS} from '../actions/check-connection';

const initialState = {
    isConnected: false,
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
