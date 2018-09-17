import {
    KEYS_KEYPAIR,
    KEYS_TEST_USER,
    KEYS_KEYPAIR_SAVED,
    KEYS_IMPORT_ERROR
} from '../actions';

export const initialState = {
    publicKey: null,
    secretKey: null,
    mnemonic: null,
    testUserKey: null,
    keysSaved: false,
    importError: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case KEYS_TEST_USER:
            return {
                ...state,
                testUserKey: action.testUserKey
            };
        case KEYS_KEYPAIR:
            if (!action.keypair) {
                return {
                    ...state,
                    publicKey: null,
                    secretKey: null,
                    mnemonic: null,
                    keysSaved: false
                };
            }
            return {
                ...state,
                publicKey: action.keypair.publicKey(),
                secretKey: action.keypair.secret(),
                mnemonic: action.mnemonic,
                keysSaved: action.keysSaved
            };
        case KEYS_KEYPAIR_SAVED:
            return {
                ...state,
                keysSaved: true
            };
        case KEYS_IMPORT_ERROR:
            return {
                ...state,
                importError: action.error
            };
        default:
            return state;
    }
};
