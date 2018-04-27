import {load, save} from '../utils/storage';
// import {clear} from '../utils/storage';
// import wait from './wait';

const pkg = require('../../../package.json');
const storageKey = 'messages';

export const MESSAGES_LOADING = 'MESSAGES_LOADING';
export const MESSAGES_UPDATE = 'MESSAGES_UPDATE';
export const MESSAGES_NOTIFY = 'MESSAGES_NOTIFY';
export const MESSAGES_MARK_READ = 'MESSAGES_MARK_READ';
export const MESSAGES_ERROR = 'MESSAGES_ERROR';

const getEntries = () => {
    const {space, accessToken} = pkg.contentful;
    return fetch(`https://cdn.contentful.com/spaces/${space}/entries?access_token=${accessToken}&content_type=message`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json());
};

export const messagesUpdate = messages => ({type: MESSAGES_UPDATE, messages});
export const messagesLoading = value => ({type: MESSAGES_LOADING, value});
export const messagesError = error => ({type: MESSAGES_ERROR, error});
export const messagesNotify = notify => ({type: MESSAGES_NOTIFY, notify});
export const messagesMarkRead = () => ({type: MESSAGES_MARK_READ});

export const messagesLoad = () => dispatch => {
    dispatch(messagesLoading(true));

    return getEntries()
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
