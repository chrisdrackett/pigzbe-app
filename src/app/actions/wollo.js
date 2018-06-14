import {
    getServer,
    setServer,
    isValidPublicKey,
    paymentHistory,
    paymentInfo,
    sendPayment,
    Asset,
    getBalance,
    getMinBalance,
    checkHasGas,
    getAssetIssuer,
    checkAssetTrusted
} from '@pigzbe/stellar-utils';
import {strings, ASSET_CODE} from '../constants';
import Config from 'react-native-config';

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
export const WOLLO_UPDATE_ISSUER = 'WOLLO_UPDATE_ISSUER';

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

const updateIssuer = issuer => ({type: WOLLO_UPDATE_ISSUER, issuer});

const updateXLM = account => dispatch => {
    const balanceXLM = getBalance(account);
    const minXLM = getMinBalance(account);
    const hasGas = checkHasGas(account);
    dispatch({type: WOLLO_UPDATE_XLM, balanceXLM, minXLM, hasGas});
};

export const loadAccount = publicKey => dispatch => {
    return getServer().loadAccount(publicKey)
        .then(account => {
            dispatch({type: WOLLO_UPDATE_ACCOUNT, account});
            dispatch(updateBalance(getWolloBalance(account)));
            dispatch(updateIssuer(getAssetIssuer(account, ASSET_CODE)));
            dispatch(updateXLM(account));
            return account;
        });
};

export const loadPayments = () => (dispatch, getState) => {
    const {publicKey} = getState().auth;

    dispatch(wolloLoading(true));
    dispatch(wolloError(null));

    return paymentHistory(publicKey)
        .then(payments => payments.filter(p => p.type !== 'account_merge'))
        .then(payments => Promise.all(payments.map(p => paymentInfo(p, publicKey))))
        .then(payments => dispatch({type: WOLLO_UPDATE_PAYMENTS, payments}))
        .catch(error => {
            console.log(error);
            dispatch(wolloError(error));
        })
        .finally(() => dispatch(wolloLoading(false)));
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

    const {secretKey} = getState().auth;
    // const {issuer} = getState().wollo;
    const asset = new Asset(ASSET_CODE, Config.STELLAR_TOKEN_ISSUER);

    // TODO: Check that destination account trusts Wollo

    const destAccount = await getServer().loadAccount(destination);
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
    // dispatch(notify('Transfer complete'));
};
