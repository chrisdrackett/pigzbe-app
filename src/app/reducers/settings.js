import {
    SETTINGS_ENABLE_TOUCH_ID,
    SETTINGS_UPDATE
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
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SETTINGS_ENABLE_TOUCH_ID:
            return {
                ...state,
                enableTouchId: action.value
            };
        case SETTINGS_UPDATE:
            return {
                ...state,
                enableTouchId: valueOrDefault(action.enableTouchId, state.enableTouchId),
                subscribe: valueOrDefault(action.subscribe, state.subscribe),
                email: valueOrDefault(action.email, state.email),
                phone: valueOrDefault(action.phone, state.phone),
                country: valueOrDefault(action.country, state.country),
            };
        default:
            return state;
    }
};
