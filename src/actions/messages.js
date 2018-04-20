const pkg = require('../../package.json');

export const MESSAGES_LOADING = 'MESSAGES_LOADING';
export const MESSAGES_UPDATE = 'MESSAGES_UPDATE';
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

getEntries()
    .then(json => console.log(json));

export const messagesUpdate = messages => ({type: MESSAGES_UPDATE, messages});
export const messagesLoading = value => ({type: MESSAGES_LOADING, value});
export const messagesError = error => ({type: MESSAGES_ERROR, error});

export const messagesLoad = () => dispatch => {
    dispatch(messagesLoading(true));
    getEntries()
        .then(({items}) => items.map(item => item.fields))
        .then(messages => messages.sort((a, b) => new Date(b.date) - new Date(a.date)))
        .then(messages => {
            dispatch(messagesUpdate(messages));
            dispatch(messagesLoading(false));
        })
        .catch(error => {
            console.error(error.message);
            dispatch(messagesLoading(false));
            dispatch(messagesError(error));
        });
};
