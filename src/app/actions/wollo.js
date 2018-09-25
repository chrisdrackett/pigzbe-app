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
    KID_WALLET_BALANCE_XLM,
    KID_TASKS_BALANCE_XLM,
    KID_GOAL_BALANCE_XLM,
    KID_ADD_MEMO_PREPEND
} from '../constants';
import Keychain from '../utils/keychain';
import {wolloAsset} from '../selectors';
import {createKeypair} from './';

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

export const loadWallet = publicKey => async (dispatch, getState) => {
    console.log('loadWallet');
    try {
        const key = publicKey || getState().keys.publicKey;
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
        console.log(error);
    }
};

export const loadPayments = () => async (dispatch, getState) => {
    const {publicKey} = getState().keys;

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
    console.log('sendWollo', destination, amount, memo);
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

    const {secretKey, publicKey} = getState().keys;
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

export const fundKidAccount = (name, address) => async (dispatch, getState) => {
    console.log('fundKidAccount', name, address);
    const {publicKey, secretKey} = getState().keys;
    const kidSecretKey = await Keychain.load(`secret_${address}`);
    try {
        const keypair = Keypair.fromSecret(kidSecretKey);
        const destination = keypair.publicKey();

        const account = await createAccount(secretKey, destination, KID_WALLET_BALANCE_XLM, `${KID_ADD_MEMO_PREPEND}${name}`);
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
    } catch (error) {
        console.log(error);
    }
};

export const createKidAccount = (name, index) => async (dispatch, getState) => {
    console.log('createKidAccount', name);
    // const {publicKey, secretKey} = getState().keys;
    const {secretKey} = getState().keys;
    const keypair = await dispatch(createKeypair());
    const destination = keypair.publicKey();
    console.log('secretKey, destination', secretKey, destination);

    await Keychain.save(`secret_${destination}`, keypair.secret());

    console.log('startingBalance', KID_WALLET_BALANCE_XLM);

    await dispatch(fundKidAccount(name, destination));

    return destination;
};

export const createTasksAccount = kid => async (dispatch, getState) => {
    try {
        const {publicKey, secretKey} = getState().keys;
        const keypair = await dispatch(createKeypair());
        const destination = keypair.publicKey();
        console.log('secretKey, destination', secretKey, destination);

        await Keychain.save(`secret_${destination}`, keypair.secret());

        console.log('startingBalance', KID_TASKS_BALANCE_XLM);

        const account = await createAccount(secretKey, destination, KID_TASKS_BALANCE_XLM, `Tasks: ${kid.name}`);

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

export const createGoalAccount = (kid, goalName) => async (dispatch, getState) => {
    try {
        const {publicKey, secretKey} = getState().keys;
        const keypair = await dispatch(createKeypair());
        const destination = keypair.publicKey();
        await Keychain.save(`secret_${destination}`, keypair.secret());

        const account = await createAccount(secretKey, destination, KID_GOAL_BALANCE_XLM, `Goal: ${kid.name} - ${goalName}`.slice(0, 28));

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
    const {publicKey, secretKey} = getState().keys;
    const asset = wolloAsset(getState());
    const funderSecretKey = 'SCBLV2OXPIMUHKYJRS3TMPGPBRWEVKWTJB33TW6RZEJ276VWX5GPCPXQ';
    try {
        await sendPayment(funderSecretKey, publicKey, '100', 'Fund XLM');
    } catch (error) {
        await createAccount(funderSecretKey, publicKey, '100', 'Fund XLM');
    }
    try {
        await trustAsset(secretKey, asset);
        await sendPayment(funderSecretKey, publicKey, '500', 'Fund WLO', asset);
    } catch (error) {
        console.log(error);
    }
};
