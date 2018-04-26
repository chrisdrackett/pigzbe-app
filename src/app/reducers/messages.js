import {
    MESSAGES_UPDATE,
    MESSAGES_LOADING,
    MESSAGES_ERROR
} from '../actions';

export const initialState = {
    messages: [],
    messagesLoading: false,
    messagesError: null,
    messagesUnread: true
};

export default (state = initialState, action) => {
    switch (action.type) {
        case MESSAGES_UPDATE:
            return {
                ...state,
                messages: action.messages
            };
        case MESSAGES_LOADING:
            return {
                ...state,
                messagesLoading: action.value
            };
        case MESSAGES_ERROR:
            return {
                ...state,
                messagesError: action.error
            };
        default:
            return state;
    }
};
