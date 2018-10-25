import {Keypair} from '@pigzbe/stellar-utils';
import {KEYCHAIN_ID_MNEMONIC, KEYCHAIN_ID_STELLAR_KEY} from '../constants';
import Keychain from '../utils/keychain';
import {generateMnemonic, getSeedHex, getKeypair} from '../utils/hd-wallet';
import {appError, loadWallet, settingsUpdate} from './';

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

export const createKeypair = () => async (dispatch, getState) => {
    const mnemonic = await Keychain.load(KEYCHAIN_ID_MNEMONIC);

    const keyIndex = getState().settings.keyIndex + 1;

    await dispatch(settingsUpdate({keyIndex}));

    if (mnemonic) {
        return getKeypair(getSeedHex(mnemonic), keyIndex);
    }

    return null;
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

export const getKeys = () => async (dispatch, getState) => {
    const mnemonic = await Keychain.load(KEYCHAIN_ID_MNEMONIC);
    const secretKey = await Keychain.load(KEYCHAIN_ID_STELLAR_KEY);
    const {testUserKey} = getState().keys;

    console.log(mnemonic);

    if (testUserKey) {
        return Keypair.fromSecret(secretKey);
    }

    if (mnemonic) {
        return getKeypair(getSeedHex(mnemonic), 0);
    }

    if (secretKey) {
        return Keypair.fromSecret(secretKey);
    }

    return null;
};

export const loadKeys = () => async dispatch => {
    try {
        const keypair = await dispatch(getKeys());
        dispatch(setKeys(keypair, null, true));
    } catch (error) {
        console.log(error);
    }
};

export const clearKeys = () => async dispatch => {
    await Keychain.clear(KEYCHAIN_ID_MNEMONIC);
    await Keychain.clear(KEYCHAIN_ID_STELLAR_KEY);
    dispatch(setKeys(null));
};

export const keysTestUser = testUserKey => ({type: KEYS_TEST_USER, testUserKey});
