import {
    VIP_SET_STEP,
    VIP_EMAIL_VERIFIED,
    VIP_ERROR,
    VIP_LOADING,
    VIP_CONFIRMED
} from '../actions';

export const initialState = {
    step: null,
    emailVerified: false,
    loading: false,
    confirmed: false,
    error: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case VIP_SET_STEP:
            return {
                ...state,
                step: action.step,
            };
        case VIP_EMAIL_VERIFIED:
            return {
                ...state,
                emailVerified: action.verified,
            };
        case VIP_ERROR:
            return {
                ...state,
                error: action.error,
            };
        case VIP_LOADING:
            return {
                ...state,
                loading: action.loading,
            };
        case VIP_CONFIRMED:
            return {
                ...state,
                confirmed: true,
            };
        default:
            return state;
    }
};
