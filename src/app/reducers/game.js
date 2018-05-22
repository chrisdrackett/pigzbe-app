import {
    GAME_WOLLO_COLLECTED,
    GAME_OVERLAY_OPEN
} from '../actions';

export const initialState = {
    wolloCollected: 0,
    overlayOpen: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GAME_WOLLO_COLLECTED:
            return {
                ...state,
                wolloCollected: action.value
            };
        case GAME_OVERLAY_OPEN:
            return {
                ...state,
                overlayOpen: action.value
            };
        default:
            return state;
    }
};
