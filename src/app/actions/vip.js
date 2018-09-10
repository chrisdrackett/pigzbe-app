
export const VIP_SET_STEP = 'VIP_SET_STEP';
export const VIP_SET_DETAILS = 'VIP_SET_DETAILS';
export const VIP_FETCH_ADDRESSES = 'VIP_FETCH_ADDRESSES';
export const VIP_SET_FETCHING_ADDRESSES = 'VIP_SET_FETCHING_ADDRESSES';
export const VIP_SET_PENDING_ADDRESS = 'VIP_SET_PENDING_ADDRESS';
export const VIP_ADD_ADDRESS = 'VIP_ADD_ADDRESS';
export const VIP_SET_DOCUMENT_TYPE = 'VIP_SET_DOCUMENT_TYPE';
export const VIP_ADD_DOCUMENT_IMAGE = 'VIP_ADD_DOCUMENT_IMAGE';
export const VIP_CLEAR_DOCUMENT_IMAGES = 'VIP_CLEAR_DOCUMENT_IMAGES';

export const vipSetStep = step => ({type: VIP_SET_STEP, step});

export const vipSetDetails = details => ({type: VIP_SET_DETAILS, details});

export const vipSetFetchingAddresses = fetchingAddresses => ({type: VIP_SET_FETCHING_ADDRESSES, fetchingAddresses});

export const vipSetPendingAddress = pendingAddress => ({type: VIP_SET_PENDING_ADDRESS, pendingAddress});

export const vipFetchAddresses = (postCode, houseNumber) => async (dispatch, getState) => {
    dispatch(vipSetFetchingAddresses(true));
    try {
        // @todo fetch addresses from API and filter by house number (if present)
        await new Promise((resolve,reject) => {
            setTimeout(() => {
                resolve();
            }, 1000);
        });
    } catch (error) {
        console.log(error);
    }
    dispatch(vipSetFetchingAddresses(false));
};

export const vipAddAddress = address => ({type: VIP_ADD_ADDRESS, address});

export const vipSetDocumentType = documentType => ({type: VIP_SET_DOCUMENT_TYPE, documentType});

export const vipAddDocumentImage = documentImage => ({type: VIP_ADD_DOCUMENT_IMAGE, documentImage});

export const vipClearDocumentImages = () => ({type: VIP_CLEAR_DOCUMENT_IMAGES});

