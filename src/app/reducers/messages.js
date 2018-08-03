import {
    MESSAGES_UPDATE,
    MESSAGES_NOTIFY,
    MESSAGES_MARK_READ,
    MESSAGES_LOADING,
    MESSAGES_ERROR
} from '../actions';

export const initialState = {
    messages: [],
    loadMessagesing: false,
    messagesError: null,
    messagesNotify: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case MESSAGES_UPDATE:
            return {
                ...state,
                messages: action.messages
            };
        case MESSAGES_NOTIFY:
            return {
                ...state,
                messagesNotify: action.notify
            };
        case MESSAGES_MARK_READ:
            return {
                ...state,
                messagesNotify: false
            };
        case MESSAGES_LOADING:
            return {
                ...state,
                loadMessagesing: action.value
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
