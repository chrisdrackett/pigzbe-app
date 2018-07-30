import {
    SETTINGS_ENABLE_TOUCH_ID,
    SETTINGS_UPDATE,
    SETTINGS_FIRST_TIME
} from '../actions';

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
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SETTINGS_FIRST_TIME:
            return {
                ...state,
                firstTime: false
            };
        case SETTINGS_ENABLE_TOUCH_ID:
            return {
                ...state,
                enableTouchId: action.value
            };
        case SETTINGS_UPDATE:
            return Object.keys(initialState).reduce((ob, key) => {
                ob[key] = valueOrDefault(action[key], state[key]);
                return ob;
            }, {});
        default:
            return state;
    }
};
