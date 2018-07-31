import fetchTimeout from '../utils/fetch-timeout';
import {apiURL} from '../selectors';
import {settingsUpdate} from './';

export const MESSAGES_LOADING = 'MESSAGES_LOADING';
export const MESSAGES_UPDATE = 'MESSAGES_UPDATE';
export const MESSAGES_NOTIFY = 'MESSAGES_NOTIFY';
export const MESSAGES_MARK_READ = 'MESSAGES_MARK_READ';
export const MESSAGES_ERROR = 'MESSAGES_ERROR';

export const messagesUpdate = messages => ({type: MESSAGES_UPDATE, messages});
export const loadMessagesing = value => ({type: MESSAGES_LOADING, value});
export const messagesError = error => ({type: MESSAGES_ERROR, error});
export const messagesNotify = notify => ({type: MESSAGES_NOTIFY, notify});
export const messagesMarkRead = () => ({type: MESSAGES_MARK_READ});

export const loadMessages = () => async (dispatch, getState) => {
    console.log('8. loadMessages');
    try {
        dispatch(loadMessagesing(true));

        const api = apiURL(getState());
        const messages = await fetchTimeout(`${api}/content/messages?order=latest`);

        if (!messages) {
            throw new Error('Network error');
        }

        dispatch(messagesUpdate(messages));

        const {lastMessageDate} = getState().settings;
        const latestDate = messages[0].date;
        const notify = new Date(latestDate) > new Date(lastMessageDate);

        dispatch(messagesNotify(notify));
        dispatch(settingsUpdate({lastMessageDate: latestDate}));
        dispatch(loadMessagesing(false));

    } catch (error) {
        console.log(error.message);
        dispatch(loadMessagesing(false));
        dispatch(messagesError(error));
    }
};
