import {load, save} from '../utils/storage';
import apiURL from '../utils/api-url';
import fetchJSON from './fetch-json';
// import {loadContent} from './';
// import {clear} from '../utils/storage';
// import wait from './wait';
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

// export const loadMessages = (query = '') => () => fetch(`${apiURL()}/content/messages?${query}`).then(res => res.json());
export const loadMessages = (query = '') => () => fetchJSON(`${apiURL()}/content/messages?${query}`);

export const messagesLoad = () => dispatch => {
    console.log('messagesLoad');
    dispatch(messagesLoading(true));

    return dispatch(loadMessages('order=latest'))
        // .then(messages => wait(0.5, messages))
        .then(messages => {
            dispatch(messagesUpdate(messages));

            // clear(storageKey);

            return load(storageKey)
                .then(data => data.lastDate || 0)
                .then(lastDate => {
                    if (!messages) {
                        throw new Error('Network error');
                    }
                    const latestDate = messages[0].date;
                    const notify = new Date(latestDate) > new Date(lastDate);

                    // console.log('lastDate', lastDate);
                    // console.log('latestDate', latestDate);

                    dispatch(messagesNotify(notify));

                    return save(storageKey, {lastDate: latestDate})
                        .then(() => dispatch(messagesLoading(false)));
                });
        })
        .catch(error => {
            console.log(error.message);
            dispatch(messagesLoading(false));
            dispatch(messagesError(error));
        });
};
