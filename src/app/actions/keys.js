import {Keypair} from '@pigzbe/stellar-utils';
import {KEYCHAIN_ID_MNEMONIC, KEYCHAIN_ID_STELLAR_KEY} from '../constants';
import Keychain from '../utils/keychain';
import {generateMnemonic, getSeedHex, getKeypair} from '../utils/hd-wallet';
import {appError, loadWallet} from './';

export const KEYS_IMPORT_ERROR = 'KEYS_IMPORT_ERROR';
export const KEYS_TEST_USER = 'KEYS_TEST_USER';
export const KEYS_KEYPAIR = 'KEYS_KEYPAIR';
export const KEYS_KEYPAIR_SAVED = 'KEYS_KEYPAIR_SAVED';

export const createMnemonic = () => async () => {
    const mnemonic = await generateMnemonic();
    const seedHex = getSeedHex(mnemonic);
    return {mnemonic, seedHex};
};

export const createKeysFromSeed = (seedHex, index = 0) => () => getKeypair(seedHex, index);

const createKeypair = async () => {
    if (typeof Keypair.randomAsync === 'function') {
        return await Keypair.randomAsync();
    }
    return Keypair.random();
};

export const setKeys = (keypair, mnemonic, keysSaved) => ({type: KEYS_KEYPAIR, keypair, mnemonic, keysSaved});

export const saveKeys = () => async (dispatch, getState) => {
    const {publicKey, secretKey, mnemonic} = getState().keys;
    if (mnemonic) {
        await Keychain.save(KEYCHAIN_ID_MNEMONIC, mnemonic);
    }
    await Keychain.save(KEYCHAIN_ID_STELLAR_KEY, secretKey);
    dispatch({type: KEYS_KEYPAIR_SAVED});
    await dispatch(loadWallet(publicKey));
};

export const createKeys = () => async dispatch => {
    try {
        const keypair = await createKeypair();
        return dispatch(setKeys(keypair, null, false));
    } catch (e) {
        console.log(e);
    }
    return null;
};

export const importKeyError = error => ({type: KEYS_IMPORT_ERROR, error});

export const importKey = secretKey => async dispatch => {
    dispatch(importKeyError(null));
    dispatch(appError(null));

    try {
        const keypair = Keypair.fromSecret(secretKey);
        dispatch(setKeys(keypair, null, true));
        await dispatch(saveKeys());
    } catch (error) {
        console.log(error);
        const err = new Error('Invalid key');
        dispatch(importKeyError(err));
        dispatch(appError(err));
    }
};

export const loadKeys = () => async (dispatch, getState) => {
    const stellar = await Keychain.load(KEYCHAIN_ID_STELLAR_KEY);
    const {testUserKey} = getState().keys;

    const secretKey = testUserKey || stellar.key;

    let keypair = null;

    if (secretKey) {
        try {
            keypair = Keypair.fromSecret(secretKey);
            dispatch(setKeys(keypair, null, true));
        } catch (e) {}
    }
};

export const clearKeys = () => async dispatch => {
    await Keychain.clear(KEYCHAIN_ID_STELLAR_KEY);
    dispatch(setKeys(null));
};

export const keysTestUser = testUserKey => ({type: KEYS_TEST_USER, testUserKey});
