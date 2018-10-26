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
    multiSigTransaction,
    trustAssetTransaction,
    submitTransaction,
    Keypair
} from '@pigzbe/stellar-utils';
import {
    strings,
    ASSET_CODE,
    KID_GOAL_BALANCE_XLM,
    KID_HOME_BALANCE_XLM,
    MEMO_PREPEND_GOAL
} from '../constants';
import Keychain from '../utils/keychain';
import {wolloAsset} from '../selectors';
import {createKeypair, appError} from './';
import formatMemo from 'app/utils/format-memo';

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

export const refreshBalance = () => async (dispatch, getState) => {
    const key = getState().keys.publicKey;
    try {
        if (key) {
            const account = await loadAccount(key);
            dispatch({type: WOLLO_UPDATE_ACCOUNT, account});
            dispatch(updateBalance(getWolloBalance(account)));
            dispatch(updateXLM(account));
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
    const destAccount = await loadAccount(destination);
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

export const createHomeAccount = (memo, nickname, address) => async (dispatch, getState) => {
    console.log('createHomeAccount', nickname);
    try {
        const {publicKey, secretKey} = getState().keys;
        console.log('publicKey, secretKey', publicKey, secretKey);
        const keypair = await dispatch(createKeypair());
        const destination = keypair.publicKey();
        console.log('createHomeAccount destination', destination);

        await Keychain.save(`secret_${destination}`, keypair.secret());

        console.log('createHomeAccount startingBalance', KID_HOME_BALANCE_XLM);

        // await dispatch(fundKidAccount(`${memo}${nickname}`, destination, startingBalance));

        const memoStr = formatMemo(`${memo}${nickname}`);

        console.log('memoStr', memoStr);

        const account = await createAccount(secretKey, destination, KID_HOME_BALANCE_XLM, memoStr);

        console.log('account', account);

        const signers = [{
            publicKey,
            weight: 1
        }, {
            publicKey: address,
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

        try {
            const homeAcc = await loadAccount(destination);
            console.log('getMinBalance HOME', getMinBalance(homeAcc, 1000));
        } catch (e) {
            console.log(e);
        }

        return destination;

    } catch (error) {
        console.log(error);
    }

    return null;
};

export const createGoalAccount = (kid, goalName) => async (dispatch, getState) => {
    try {
        const {publicKey, secretKey} = getState().keys;
        const keypair = await dispatch(createKeypair());
        const destination = keypair.publicKey();
        console.log('createGoalAccount destination', destination);
        await Keychain.save(`secret_${destination}`, keypair.secret());

        const memo = formatMemo(`${MEMO_PREPEND_GOAL}${goalName.trim()}`);
        console.log('memo', memo);
        console.log('secretKey', secretKey);
        let account;
        try {
            account = await createAccount(secretKey, destination, KID_GOAL_BALANCE_XLM, memo);

        } catch (e) {
            console.log(e);
        }

        console.log('account', account);

        if (!account) {
            return null;
        }

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
        const result = await submitTransaction(transaction);

        console.log('result', result);

        try {
            const goalAcc = await loadAccount(destination);
            console.log('getMinBalance GOAL', getMinBalance(goalAcc, 1000));
        } catch (e) {
            console.log(e);
        }

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

export const fundAccount = (xlm = '100', wollo = '500') => async (dispatch, getState) => {
    const {publicKey, secretKey} = getState().keys;
    const asset = wolloAsset(getState());
    const funderSecretKey = 'SBJZSBTMIKWYZ3NLK7ZM5OWGLFE33YWLWZBMKI6GXRLHVQ2VTLS2NGPH';
    try {
        console.log('Trying to send XLM', publicKey);
        await sendPayment(funderSecretKey, publicKey, xlm, 'Fund XLM');
    } catch (error) {
        console.log('Creating account with XLM', publicKey);
        try {
            await createAccount(funderSecretKey, publicKey, xlm, 'Fund XLM');
        } catch (err) {
            console.log(err);
        }
    }
    try {
        await trustAsset(secretKey, asset);
        await sendPayment(funderSecretKey, publicKey, wollo, 'Fund WLO', asset);
    } catch (error) {
        console.log(error);
    }
};
