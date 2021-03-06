import valueOrDefault from '../utils/value-or-default';
import {SETTINGS_UPDATE} from '../actions';
import {BASE_CURRENCY} from '../constants';

export const initialState = {
    enableTouchId: false,
    subscribe: false,
    authyId: null,
    email: null,
    phone: null,
    country: null,
    firstTime: true,
    lastMessageDate: 0,
    baseCurrency: BASE_CURRENCY,
    keyIndex: 0,
    inactivityTimeout: 60 * 5 * 1000,
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
