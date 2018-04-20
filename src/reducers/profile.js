import {
    PROFILE_LOADING,
    PROFILE_UPDATE,
    PROFILE_AVAILABLE
} from '../actions';

const initialState = {
    name: 'name',
    email: 'email@example.com',
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
                name: action.name,
                email: action.email,
                image: action.image,
                subscribe: action.subscribe
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
