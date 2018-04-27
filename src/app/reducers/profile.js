import {
    PROFILE_LOADING,
    PROFILE_UPDATE,
    PROFILE_AVAILABLE
} from '../actions';

const isUndefined = value => typeof value === 'undefined';
const valueOrDefault = (value, defaultValue) => {
    return isUndefined(value) ? defaultValue : value;
};

export const initialState = {
    name: '',
    email: '',
    image: '',
    subscribe: true,
    hasProfile: false,
    isLoadingProfile: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case PROFILE_LOADING:
            return {
                ...state,
                isLoadingProfile: action.value
            };
        case PROFILE_UPDATE:
            return {
                ...state,
                name: valueOrDefault(action.name, ''),
                email: valueOrDefault(action.email, ''),
                image: valueOrDefault(action.image, null),
                subscribe: valueOrDefault(action.subscribe, true)
            };
        case PROFILE_AVAILABLE:
            return {
                ...state,
                hasProfile: action.value
            };
        default:
            return state;
    }
};
