import Storage from '../utils/storage';
import fetchTimeout from '../utils/fetch-timeout';
import {apiURL} from '../selectors';

const storageKey = 'messages';

export const MESSAGES_LOADING = 'MESSAGES_LOADING';
export const MESSAGES_UPDATE = 'MESSAGES_UPDATE';
export const MESSAGES_NOTIFY = 'MESSAGES_NOTIFY';
export const MESSAGES_MARK_READ = 'MESSAGES_MARK_READ';
export const MESSAGES_ERROR = 'MESSAGES_ERROR';

export const messagesUpdate = messages => ({type: MESSAGES_UPDATE, messages});
export const messagesLoading = value => ({type: MESSAGES_LOADING, value});
export const messagesError = error => ({type: MESSAGES_ERROR, error});
export const messagesNotify = notify => ({type: MESSAGES_NOTIFY, notify});
export const messagesMarkRead = () => ({type: MESSAGES_MARK_READ});

export const messagesLoad = () => async (dispatch, getState) => {
    try {
        const api = apiURL(getState());

        dispatch(messagesLoading(true));

        const messages = await fetchTimeout(`${api}/content/messages?order=latest`);

        if (!messages) {
            throw new Error('Network error');
        }

        dispatch(messagesUpdate(messages));

        const data = await Storage.load(storageKey);
        const lastDate = data.lastDate || 0;
        const latestDate = messages[0].date;
        const notify = new Date(latestDate) > new Date(lastDate);
        dispatch(messagesNotify(notify));

        await Storage.save(storageKey, {lastDate: latestDate});

        dispatch(messagesLoading(false));

    } catch (error) {
        console.log(error.message);
        dispatch(messagesLoading(false));
        dispatch(messagesError(error));
    }
};
