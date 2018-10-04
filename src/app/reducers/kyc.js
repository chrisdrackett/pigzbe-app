
import {
    KYC_SET_STEP,
    KYC_SET_DETAILS,
    KYC_SET_FETCHING_ADDRESSES,
    KYC_SET_PENDING_ADDRESS,
    KYC_ADD_ADDRESS,
    KYC_SET_DOCUMENT_TYPE,
    KYC_ADD_DOCUMENT_IMAGE,
    KYC_CLEAR_DOCUMENT_IMAGES,
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
        case KYC_SET_STEP:
            return {
                ...state,
                step: action.step,
            };
        case KYC_SET_DETAILS:
            return {
                ...state,
                details: {
                    ...state.details,
                    ...action.details,
                },
            };
        case KYC_SET_FETCHING_ADDRESSES:
            return {
                ...state,
                fetchingAddresses: action.fetchingAddresses,
            };
        case KYC_SET_PENDING_ADDRESS:
            return {
                ...state,
                pendingAddress: action.pendingAddress,
            };
        case KYC_ADD_ADDRESS:
            return {
                ...state,
                addresses: [
                    ...state.addresses,
                    action.address,
                ]
            };
        case KYC_SET_DOCUMENT_TYPE:
            return {
                ...state,
                documentType: action.documentType,
            };
        case KYC_ADD_DOCUMENT_IMAGE:
            return {
                ...state,
                documentImages: [
                    ...state.documentImages,
                    action.documentImage,
                ],
            };
        case KYC_CLEAR_DOCUMENT_IMAGES:
            return {
                ...state,
                documentImages: [],
            };
        default:
            return state;
    }
};
