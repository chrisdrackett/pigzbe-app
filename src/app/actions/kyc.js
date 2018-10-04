
export const KYC_SET_STEP = 'KYC_SET_STEP';
export const KYC_SET_DETAILS = 'KYC_SET_DETAILS';
export const KYC_FETCH_ADDRESSES = 'KYC_FETCH_ADDRESSES';
export const KYC_SET_FETCHING_ADDRESSES = 'KYC_SET_FETCHING_ADDRESSES';
export const KYC_SET_PENDING_ADDRESS = 'KYC_SET_PENDING_ADDRESS';
export const KYC_ADD_ADDRESS = 'KYC_ADD_ADDRESS';
export const KYC_SET_DOCUMENT_TYPE = 'KYC_SET_DOCUMENT_TYPE';
export const KYC_ADD_DOCUMENT_IMAGE = 'KYC_ADD_DOCUMENT_IMAGE';
export const KYC_CLEAR_DOCUMENT_IMAGES = 'KYC_CLEAR_DOCUMENT_IMAGES';

export const kycSetStep = step => ({type: KYC_SET_STEP, step});

export const kycSetDetails = details => ({type: KYC_SET_DETAILS, details});

export const kycSetFetchingAddresses = fetchingAddresses => ({type: KYC_SET_FETCHING_ADDRESSES, fetchingAddresses});

export const kycSetPendingAddress = pendingAddress => ({type: KYC_SET_PENDING_ADDRESS, pendingAddress});

export const kycFetchAddresses = (postCode, houseNumber) => async (dispatch, getState) => {
    dispatch(kycSetFetchingAddresses(true));
    try {
        // @todo fetch addresses from API and filter by house number (if present)
        await new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, 1000);
        });
    } catch (error) {
        console.log(error);
    }
    dispatch(kycSetFetchingAddresses(false));
};

export const kycAddAddress = address => ({type: KYC_ADD_ADDRESS, address});

export const kycSetDocumentType = documentType => ({type: KYC_SET_DOCUMENT_TYPE, documentType});

export const kycAddDocumentImage = documentImage => ({type: KYC_ADD_DOCUMENT_IMAGE, documentImage});

export const kycClearDocumentImages = () => ({type: KYC_CLEAR_DOCUMENT_IMAGES});
