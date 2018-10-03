import {
    VIP_SET_STEP,
} from '../actions';

export const initialState = {
    step: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case VIP_SET_STEP:
            return {
                ...state,
                step: action.step,
            };
        default:
            return state;
    }
};
