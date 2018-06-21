import {
    CONFIG_INIT
} from '../actions';

export const initialState = {};

export default (state = initialState, action) => {
    switch (action.type) {
        case CONFIG_INIT:
            return {
                ...state,
                ...action.config
            };
        default:
            return state;
    }
};
