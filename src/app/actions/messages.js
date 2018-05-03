import {load, save} from '../utils/storage';
import {loadContent} from './';
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

export const messagesLoad = () => dispatch => {
    dispatch(messagesLoading(true));

    return dispatch(loadContent('content_type=message'))
        .then(({items}) => items.map(item => item.fields))
        .then(messages => messages.sort((a, b) => new Date(b.date) - new Date(a.date)))
        // .then(messages => wait(0.5, messages))
        .then(messages => {
            dispatch(messagesUpdate(messages));

            // clear(storageKey);

            return load(storageKey)
                .then(data => data.lastDate || 0)
                .then(lastDate => {
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
            console.error(error.message);
            dispatch(messagesLoading(false));
            dispatch(messagesError(error));
        });
};
