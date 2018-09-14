import {
    Keypair,
    loadAccount,
    setServer,
    isValidPublicKey,
    paymentHistory,
    paymentInfo,
    sendPayment,
    getBalance,
    getMinBalance,
    checkHasGas,
    checkAssetTrusted,
    trustAsset,
    createAccount,
    TransactionBuilder,
    multiSigTransaction,
    trustAssetTransaction,
    submitTransaction
} from '@pigzbe/stellar-utils';
import {
    strings,
    ASSET_CODE,
    KEYCHAIN_ID_STELLAR_KEY,
    CHILD_WALLET_BALANCE_XLM,
    CHILD_TASKS_BALANCE_XLM
} from '../constants';
import Keychain from '../utils/keychain';
import {appError} from './';
import {wolloAsset} from '../selectors';

export const WOLLO_LOADING = 'WOLLO_LOADING';
export const WOLLO_ERROR = 'WOLLO_ERROR';
export const WOLLO_USE_TESTNET = 'WOLLO_USE_TESTNET';
export const WOLLO_UPDATE_ACCOUNT = 'WOLLO_UPDATE_ACCOUNT';
export const WOLLO_UPDATE_BALANCE = 'WOLLO_UPDATE_BALANCE';
export const WOLLO_UPDATE_XLM = 'WOLLO_UPDATE_XLM';
export const WOLLO_UPDATE_PAYMENTS = 'WOLLO_UPDATE_PAYMENTS';
export const WOLLO_SENDING = 'WOLLO_SENDING';
export const WOLLO_SEND_COMPLETE = 'WOLLO_SEND_COMPLETE';
export const WOLLO_SEND_STATUS = 'WOLLO_SEND_STATUS';
export const WOLLO_TEST_USER = 'WOLLO_TEST_USER';
export const WOLLO_KEYPAIR = 'WOLLO_KEYPAIR';
export const WOLLO_KEYPAIR_SAVED = 'WOLLO_KEYPAIR_SAVED';

export const getWolloBalance = account => getBalance(account, ASSET_CODE);

const wolloLoading = loading => ({type: WOLLO_LOADING, loading});
const wolloSending = sending => ({type: WOLLO_SENDING, sending});
const wolloSendComplete = sendComplete => ({type: WOLLO_SEND_COMPLETE, sendComplete});
const wolloSendStatus = sendStatus => ({type: WOLLO_SEND_STATUS, sendStatus});

export const wolloError = error => ({type: WOLLO_ERROR, error});

export const setUseTestnet = useTestnet => dispatch => {
    setServer(useTestnet);
    dispatch({type: WOLLO_USE_TESTNET, useTestnet});
};

const updateBalance = balance => ({type: WOLLO_UPDATE_BALANCE, balance});

const updateXLM = account => dispatch => {
    const balanceXLM = getBalance(account);
    const minXLM = getMinBalance(account);
    const hasGas = checkHasGas(account);
    dispatch({type: WOLLO_UPDATE_XLM, balanceXLM, minXLM, hasGas});
};

const createKeypair = async () => {
    if (typeof Keypair.randomAsync === 'function') {
        return await Keypair.randomAsync();
    }
    return Keypair.random();
};

export const setKeys = (keypair, keysSaved) => ({type: WOLLO_KEYPAIR, keypair, keysSaved});

export const saveKeys = () => async (dispatch, getState) => {
    const {publicKey, secretKey} = getState().wollo;
    await Keychain.save(KEYCHAIN_ID_STELLAR_KEY, secretKey);
    dispatch({type: WOLLO_KEYPAIR_SAVED});
    await dispatch(loadWallet(publicKey));
};

export const createKeys = () => async dispatch => {
    try {
        const keypair = await createKeypair();
        return dispatch(setKeys(keypair, false));
    } catch (e) {
        console.log(e);
    }
    return null;
};

export const importKey = secretKey => async dispatch => {
    dispatch(wolloError(null));
    dispatch(appError(null));
    dispatch(wolloLoading(true));
    try {
        const keypair = Keypair.fromSecret(secretKey);
        dispatch(setKeys(keypair, true));
        await dispatch(saveKeys());
    } catch (error) {
        console.log(error);
        const err = new Error('Invalid key');
        dispatch(wolloError(err));
        dispatch(appError(err));
    }
    dispatch(wolloLoading(false));
};

export const loadKeys = () => async (dispatch, getState) => {
    const stellar = await Keychain.load(KEYCHAIN_ID_STELLAR_KEY);
    const {testUserKey} = getState().wollo;

    const secretKey = testUserKey || stellar.key;

    let keypair = null;

    if (secretKey) {
        try {
            keypair = Keypair.fromSecret(secretKey);
            dispatch(setKeys(keypair, true));
        } catch (e) {}
    }
};

export const clearKeys = () => async dispatch => {
    await Keychain.clear(KEYCHAIN_ID_STELLAR_KEY);
    dispatch(setKeys(null));
};

export const loadWallet = publicKey => async (dispatch, getState) => {
    try {
        const key = publicKey || getState().wollo.publicKey;
        if (key) {
            const account = await loadAccount(key);
            dispatch({type: WOLLO_UPDATE_ACCOUNT, account});
            dispatch(updateBalance(getWolloBalance(account)));

            const asset = wolloAsset(getState());
            const isTrusted = checkAssetTrusted(account, asset);
            if (!isTrusted) {
                await trustAsset(getState().wollo.secretKey, asset);
            }
            dispatch(updateXLM(account));
        }
    } catch (error) {
        console.log(error);
    }
};

export const loadPayments = () => async (dispatch, getState) => {
    const {publicKey} = getState().wollo;

    dispatch(wolloLoading(true));
    dispatch(wolloError(null));

    try {
        const rawData = await paymentHistory(publicKey);
        const filteredData = rawData.filter(p => p.type !== 'account_merge');
        const payments = await Promise.all(filteredData.map(p => paymentInfo(p, publicKey)));
        dispatch({type: WOLLO_UPDATE_PAYMENTS, payments});
    } catch (error) {
        console.log(error);
    }

    dispatch(wolloLoading(false));
};


export const sendWollo = (destination, amount, memo) => async (dispatch, getState) => {

    if (!isValidPublicKey(destination)) {
        dispatch(wolloError(new Error(strings.transferErrorInvalidKey)));
        return;
    }

    if (!amount || isNaN(amount) || Number(amount) === 0) {
        dispatch(wolloError(new Error(strings.transferErrorInvalidAmount)));
        return;
    }

    dispatch(wolloError(null));
    dispatch(wolloSendComplete(false));
    dispatch(wolloSending(true));
    dispatch(wolloSendStatus(strings.transferStatusChecking));

    const {secretKey, publicKey} = getState().wollo;
    const destAccount = await loadAccount(destination);
    const asset = wolloAsset(getState());
    const isTrusted = checkAssetTrusted(destAccount, asset);

    if (!isTrusted) {
        dispatch(wolloSending(false));
        dispatch(wolloSendStatus(null));
        dispatch(wolloError(new Error(strings.transferErrorTrust)));
        return;
    }

    dispatch(wolloSendStatus(strings.transferStatusSending));

    let result;

    try {
        result = await sendPayment(secretKey, destination, amount, memo, asset);
    } catch (e) {
        console.error(e);
    }

    if (!result) {
        dispatch(wolloSending(false));
        dispatch(wolloSendStatus(null));
        dispatch(wolloError(new Error(strings.transferStatusFailed)));
        return;
    }

    dispatch(wolloSending(false));
    dispatch(wolloSendComplete(true));
    dispatch(wolloSendStatus(strings.transferStatusComplete));
    dispatch(wolloError(null));
    dispatch(loadWallet(publicKey));
};

export const wolloTestUser = testUserKey => ({type: WOLLO_TEST_USER, testUserKey});

export const createKidAccount = name => async (dispatch, getState) => {
    console.log('createKidAccount', name);
    try {
        const {publicKey, secretKey} = getState().wollo;
        const keypair = await createKeypair();
        const destination = keypair.publicKey();
        console.log('secretKey, destination', secretKey, destination);

        await Keychain.save(`secret_${destination}`, keypair.secret());

        console.log('startingBalance', CHILD_WALLET_BALANCE_XLM);

        const account = await createAccount(secretKey, destination, CHILD_WALLET_BALANCE_XLM, `Add ${name}`);
        console.log('account', account);

        const signers = [{
            publicKey,
            weight: 1
        }];

        const weights = {
            masterWeight: 1,
            lowThreshold: 1,
            medThreshold: 1,
            highThreshold: 1
        };

        const txb = new TransactionBuilder(account);
        multiSigTransaction(txb, signers, weights);

        const asset = wolloAsset(getState());
        trustAssetTransaction(txb, asset);

        const transaction = txb.build();
        transaction.sign(keypair);
        const result = await submitTransaction(transaction);
        console.log('result', result);

        return keypair.publicKey();
    } catch (error) {
        console.log(error);
    }
    return null;
};

export const createTasksAccount = kid => async (dispatch, getState) => {
    try {
        const {publicKey, secretKey} = getState().wollo;
        const keypair = await createKeypair();
        const destination = keypair.publicKey();
        console.log('secretKey, destination', secretKey, destination);

        await Keychain.save(`secret_${destination}`, keypair.secret());

        console.log('startingBalance', CHILD_TASKS_BALANCE_XLM);

        const account = await createAccount(secretKey, destination, CHILD_TASKS_BALANCE_XLM, `Add ${kid.name} tasks`);

        console.log('account', account);

        const signers = [{
            publicKey,
            weight: 1
        }, {
            publicKey: kid.address,
            weight: 1
        }];

        const weights = {
            masterWeight: 1,
            lowThreshold: 1,
            medThreshold: 1,
            highThreshold: 1
        };

        const txb = new TransactionBuilder(account);
        multiSigTransaction(txb, signers, weights);

        const asset = wolloAsset(getState());
        trustAssetTransaction(txb, asset);

        const transaction = txb.build();
        transaction.sign(keypair);
        await submitTransaction(transaction);

        return keypair.publicKey();
    } catch (error) {
        console.log(error);
    }
    return null;
};

export const getAccountBalance = publicKey => async () => {
    console.log('getAccountBalance', publicKey);
    try {
        const account = await loadAccount(publicKey);
        return getWolloBalance(account);
    } catch (error) {
        console.log(error);
    }
    return '0';
};

export const fundAccount = () => async (dispatch, getState) => {
    const {publicKey, secretKey} = getState().wollo;
    const asset = wolloAsset(getState());
    const funderSecretKey = 'SCBLV2OXPIMUHKYJRS3TMPGPBRWEVKWTJB33TW6RZEJ276VWX5GPCPXQ';
    try {
        await sendPayment(funderSecretKey, publicKey, '50', 'Fund XLM');
    } catch (error) {
        await createAccount(funderSecretKey, publicKey, '50', 'Fund XLM');
    }
    try {
        await trustAsset(secretKey, asset);
        await sendPayment(funderSecretKey, publicKey, '400', 'Fund WLO', asset);
    } catch (error) {
        console.log(error);
    }
};
