import {
    DEVICE_AUTH_ONLINE,
    DEVICE_AUTH_ERROR,
    DEVICE_AUTH_REGSITERED,
    DEVICE_AUTH_CLEAR,
    DEVICE_AUTH_LOADING,
    DEVICE_AUTH_VERIFY_SUCCESS,
    DEVICE_AUTH_VERIFY_FAIL,
    DEVICE_AUTH_VERIFY_REQUESTED
} from '../actions';

export const initialState = {
    online: false,
    error: null,
    id: null,
    qrCode: null,
    loading: false,
    verified: false,
    requested: false,
    failCount: 0,
    email: null,
    phone: null,
    country: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case DEVICE_AUTH_ONLINE:
            return {
                ...state,
                online: action.online
            };
        case DEVICE_AUTH_REGSITERED:
            return {
                ...state,
                id: action.id,
                qrCode: action.qrCode,
                email: action.email,
                phone: action.phone,
                country: action.country,
            };
        case DEVICE_AUTH_CLEAR:
            return {
                ...state,
                id: null,
                qrCode: null
            };
        case DEVICE_AUTH_LOADING:
            return {
                ...state,
                loading: action.value
            };
        case DEVICE_AUTH_ERROR:
            return {
                ...state,
                error: action.error
            };
        case DEVICE_AUTH_VERIFY_SUCCESS:
            return {
                ...state,
                verified: true
            };
        case DEVICE_AUTH_VERIFY_FAIL:
            return {
                ...state,
                verified: false,
                failCount: state.failCount++
            };
        case DEVICE_AUTH_VERIFY_REQUESTED:
            return {
                ...state,
                requested: true,
            };
        default:
            return state;
    }
};
