import {
    PROFILE_UPDATE
} from '../actions';

const initialState = {
    name: 'name',
    email: 'email@example.com',
    image: '',
    subscribe: true
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
        default:
            return state;
    }
};
