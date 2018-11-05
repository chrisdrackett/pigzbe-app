import {
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
    trustAssetTransaction,
    submitTransaction,
    Keypair
} from '@pigzbe/stellar-utils';
import {
    strings,
    ASSET_CODE
} from '../constants';
import Keychain from '../utils/keychain';
import {wolloAsset} from '../selectors';
import {createKeypair, appError, updateKidBalance} from './';

export const WOLLO_LOADING = 'WOLLO_LOADING';
export const WOLLO_ERROR = 'WOLLO_ERROR';
export const WOLLO_UPDATE_ACCOUNT = 'WOLLO_UPDATE_ACCOUNT';
export const WOLLO_UPDATE_BALANCE = 'WOLLO_UPDATE_BALANCE';
export const WOLLO_UPDATE_XLM = 'WOLLO_UPDATE_XLM';
export const WOLLO_UPDATE_PAYMENTS = 'WOLLO_UPDATE_PAYMENTS';
export const WOLLO_SENDING = 'WOLLO_SENDING';
export const WOLLO_SEND_COMPLETE = 'WOLLO_SEND_COMPLETE';
export const WOLLO_SEND_STATUS = 'WOLLO_SEND_STATUS';
export const WOLLO_SEND_RESET = 'WOLLO_SEND_RESET';
export const WOLLO_KEYPAIR = 'WOLLO_KEYPAIR';
export const WOLLO_KEYPAIR_SAVED = 'WOLLO_KEYPAIR_SAVED';

export const getWolloBalance = account => getBalance(account, ASSET_CODE);

export const wolloLoading = loading => ({type: WOLLO_LOADING, loading});
export const wolloSending = sending => ({type: WOLLO_SENDING, sending});
export const wolloSendComplete = sendComplete => ({type: WOLLO_SEND_COMPLETE, sendComplete});
export const wolloSendStatus = sendStatus => ({type: WOLLO_SEND_STATUS, sendStatus});
export const wolloSendReset = () => ({type: WOLLO_SEND_RESET});

export const wolloError = error => ({type: WOLLO_ERROR, error});

export const setHorizonURI = uri => () => {
    console.log('setHorizonURI:', uri);
    setServer(uri);
};

const updateBalance = balance => ({type: WOLLO_UPDATE_BALANCE, balance});

const updateXLM = account => dispatch => {
    const balanceXLM = getBalance(account);
    const minXLM = getMinBalance(account, 10000);
    console.log('minXLM', minXLM);
    const hasGas = checkHasGas(account);
    dispatch({type: WOLLO_UPDATE_XLM, balanceXLM, minXLM, hasGas});
};

export const loadWallet = publicKey => async (dispatch, getState) => {
    console.log('loadWallet');
    const key = publicKey || getState().keys.publicKey;
    try {
        if (key) {
            const account = await loadAccount(key);
            console.log('account', account);
            dispatch({type: WOLLO_UPDATE_ACCOUNT, account});
            dispatch(updateBalance(getWolloBalance(account)));

            const asset = wolloAsset(getState());
            const isTrusted = checkAssetTrusted(account, asset);
            if (!isTrusted) {
                await trustAsset(getState().keys.secretKey, asset);
            }
            dispatch(updateXLM(account));
        }
    } catch (error) {
        console.log('Could not load wallet with publicKey', key);
    }
};

export const refreshBalance = kidAddress => async (dispatch, getState) => {
    const key = getState().keys.publicKey;
    try {
        if (key) {
            const account = await loadAccount(key);
            dispatch({type: WOLLO_UPDATE_ACCOUNT, account});
            dispatch(updateBalance(getWolloBalance(account)));
            dispatch(updateXLM(account));
        }
        if (kidAddress) {
            const account = await loadAccount(kidAddress);
            dispatch(updateKidBalance(kidAddress, getWolloBalance(account)));
        }
    } catch (error) {
        console.log('Could not load wallet with publicKey', key);
    }
};

export const loadPayments = address => async (dispatch, getState) => {
    const {publicKey} = getState().keys;
    const key = address || publicKey;

    dispatch(wolloLoading(true));
    dispatch(wolloError(null));

    try {
        const rawData = await paymentHistory(key);
        const filteredData = rawData.filter(p => p.type !== 'account_merge');
        const payments = await Promise.all(filteredData.map(p => paymentInfo(p, key)));
        dispatch({type: WOLLO_UPDATE_PAYMENTS, payments});
    } catch (error) {
        console.log(error);
    }

    dispatch(wolloLoading(false));
};


export const sendWollo = (destination, amount, memo) => async (dispatch, getState) => {
    console.log('sendWollo', destination, amount, memo);
    if (!isValidPublicKey(destination)) {
        dispatch(wolloError(strings.transferErrorInvalidKey));
        dispatch(appError(strings.transferErrorInvalidKey));
        return;
    }

    if (!amount || isNaN(amount) || Number(amount) === 0) {
        dispatch(wolloError(strings.transferErrorInvalidAmount));
        dispatch(appError(strings.transferErrorInvalidAmount));
        return;
    }

    dispatch(wolloError(null));
    dispatch(wolloSendComplete(false));
    dispatch(wolloSending(true));
    dispatch(wolloSendStatus(strings.transferStatusChecking));

    const {secretKey, publicKey} = getState().keys;

    let destAccount;

    try {
        destAccount = await loadAccount(destination);
    } catch (e) {
        console.log(e);
    }

    if (!destAccount) {
        dispatch(wolloSending(false));
        dispatch(wolloSendStatus(null));
        dispatch(wolloError(strings.transferStatusInvalidDestination));
        dispatch(appError(strings.transferStatusInvalidDestination));
        return;
    }

    const asset = wolloAsset(getState());

    const isTrusted = checkAssetTrusted(destAccount, asset);

    if (!isTrusted) {
        dispatch(wolloSending(false));
        dispatch(wolloSendStatus(null));
        dispatch(wolloError(strings.transferErrorTrust));
        dispatch(appError(strings.transferErrorTrust));
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
        dispatch(wolloError(strings.transferStatusFailed));
        dispatch(appError(strings.transferStatusFailed));
        return;
    }

    dispatch(refreshBalance());
    dispatch(wolloSending(false));
    dispatch(wolloSendComplete(true));
    dispatch(wolloSendStatus(strings.transferStatusComplete));
    dispatch(wolloError(null));
    dispatch(loadWallet(publicKey));
};

export const fundKidAccount = (memo, address, startingBalance) => async (dispatch, getState) => {
    console.log('fundKidAccount', memo, address, startingBalance);
    // const {publicKey, secretKey} = getState().keys;
    const {secretKey} = getState().keys;
    const kidSecretKey = await Keychain.load(`secret_${address}`);
    try {
        const keypair = Keypair.fromSecret(kidSecretKey);
        const destination = keypair.publicKey();

        const account = await createAccount(secretKey, destination, startingBalance, memo);
        console.log('account', account);

        const txb = new TransactionBuilder(account);

        const asset = wolloAsset(getState());
        trustAssetTransaction(txb, asset);

        const transaction = txb.build();
        transaction.sign(keypair);
        const result = await submitTransaction(transaction);
        console.log('result', result);
    } catch (error) {
        console.log(error);
    }
};

export const createKidAccount = (memo, nickname, startingBalance) => async dispatch => {
    console.log('createKidAccount', nickname);

    try {
        const keypair = await dispatch(createKeypair());
        const destination = keypair.publicKey();
        console.log('createKidAccount destination', destination);

        await Keychain.save(`secret_${destination}`, keypair.secret());

        console.log('createKidAccount startingBalance', startingBalance);

        await dispatch(fundKidAccount(`${memo}${nickname}`, destination, startingBalance));

        return destination;

    } catch (error) {
        console.log(error);
    }

    return null;
};
