import {
    PROFILE_UPDATE,
    PROFILE_FINISH
} from '../actions';

const initialState = {
    name: 'name',
    email: 'email@example.com',
    image: '',
    subscribe: true,
    hasProfile: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case PROFILE_UPDATE:
            return {
                ...state,
                name: action.name,
                email: action.email,
                image: action.image,
                subscribe: action.subscribe
            };
        case PROFILE_FINISH:
            return {
                ...state,
                hasProfile: true
            };
        default:
            return state;
    }
};
