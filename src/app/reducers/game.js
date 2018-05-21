import {
    GAME_WOLLO_COLLECTED
} from '../actions';

export const initialState = {
    wolloCollected: 0
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GAME_WOLLO_COLLECTED:
            return {
                ...state,
                wolloCollected: action.value
            };
        default:
            return state;
    }
};
