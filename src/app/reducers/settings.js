import {SETTINGS_UPDATE} from '../actions';

const isUndefined = value => typeof value === 'undefined';
const valueOrDefault = (value, defaultValue) => {
    return isUndefined(value) ? defaultValue : value;
};

export const initialState = {
    enableTouchId: false,
    subscribe: false,
    email: null,
    phone: null,
    country: null,
    firstTime: true,
    lastMessageDate: 0,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SETTINGS_UPDATE:
            return Object.keys(initialState).reduce((ob, key) => {
                ob[key] = valueOrDefault(action[key], state[key]);
                return ob;
            }, {});
        default:
            return state;
    }
};
