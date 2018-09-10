
import {
    VIP_SET_STEP,
    VIP_SET_DETAILS,
    VIP_SET_FETCHING_ADDRESSES,
    VIP_SET_PENDING_ADDRESS,
    VIP_ADD_ADDRESS,
    VIP_SET_DOCUMENT_TYPE,
    VIP_ADD_DOCUMENT_IMAGE,
    VIP_CLEAR_DOCUMENT_IMAGES,
} from '../actions';

export const initialState = {
    step: null,
    details: {},
    addresses: [],
    pendingAddress: null,
    documentType: null,
    documentImages: [],
    fetchingAddresses: false,
    possibleAddresses: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case VIP_SET_STEP:
            return {
                ...state,
                step: action.step,
            };
        case VIP_SET_DETAILS:
            return {
                ...state,
                details: {
                    ...state.details,
                    ...action.details,
                },
            };
        case VIP_SET_FETCHING_ADDRESSES:
            return {
                ...state,
                fetchingAddresses: action.fetchingAddresses,
            };
        case VIP_SET_PENDING_ADDRESS:
            return {
                ...state,
                pendingAddress: action.pendingAddress,
            };
        case VIP_ADD_ADDRESS:
            return {
                ...state,
                addresses: [
                    ...state.addresses,
                    action.address,
                ]
            }
        case VIP_SET_DOCUMENT_TYPE:
            return {
                ...state,
                documentType: action.documentType,
            }
        case VIP_ADD_DOCUMENT_IMAGE:
            return {
                ...state,
                documentImages: [
                    ...state.documentImages,
                    action.documentImage,
                ],
            }
        case VIP_CLEAR_DOCUMENT_IMAGES:
            return {
                ...state,
                documentImages: [],
            }
        default:
            return state;
    }
};
