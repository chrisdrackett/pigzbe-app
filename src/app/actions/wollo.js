import {getServer, setServer} from '../stellar/server';
import {isValidPublicKey} from '../stellar/validation';
import {paymentHistory, paymentInfo, sendPayment, getAsset} from '../stellar/payment';
import {getBalance, getMinBalance, getHasGas, getAssetIssuer, getAssetTrusted} from '../stellar/account';
import {ASSET_CODE} from '../constants';

export const WOLLO_SET_LOADING = 'WOLLO_SET_LOADING';
export const WOLLO_SET_ERROR = 'WOLLO_SET_ERROR';
export const WOLLO_USE_TESTNET = 'WOLLO_USE_TESTNET';
export const WOLLO_UPDATE_ACCOUNT = 'WOLLO_UPDATE_ACCOUNT';
export const WOLLO_UPDATE_BALANCE = 'WOLLO_UPDATE_BALANCE';
export const WOLLO_UPDATE_XLM = 'WOLLO_UPDATE_XLM';
export const WOLLO_UPDATE_PAYMENTS = 'WOLLO_UPDATE_PAYMENTS';
export const WOLLO_SET_SENDING = 'WOLLO_SET_SENDING';
export const WOLLO_UPDATE_ISSUER = 'WOLLO_UPDATE_ISSUER';

export const getWolloBalance = account => getBalance(account, ASSET_CODE);

const setLoading = loading => ({type: WOLLO_SET_LOADING, loading});
const setSending = sending => ({type: WOLLO_SET_SENDING, sending});
const setError = error => ({type: WOLLO_SET_ERROR, error});

export const setUseTestnet = useTestnet => dispatch => {
    setServer(useTestnet);
    dispatch({type: WOLLO_USE_TESTNET, useTestnet});
};

const updateBalance = balance => ({type: WOLLO_UPDATE_BALANCE, balance});

const updateIssuer = issuer => ({type: WOLLO_UPDATE_ISSUER, issuer});

const updateXLM = account => dispatch => {
    const balanceXLM = getBalance(account);
    const minXLM = getMinBalance(account);
    const hasGas = getHasGas(account);
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

    dispatch(setLoading(true));
    dispatch(setError(null));

    return paymentHistory(publicKey)
        .then(payments => payments.filter(p => p.type !== 'account_merge'))
        .then(payments => Promise.all(payments.map(p => paymentInfo(p, publicKey))))
        .then(payments => dispatch({type: WOLLO_UPDATE_PAYMENTS, payments}))
        .catch(error => {
            console.log(error);
            dispatch(setError(error));
        })
        .finally(() => dispatch(setLoading(false)));
};


export const sendWollo = (destination, amount, memo) => async (dispatch, getState) => {

    if (!isValidPublicKey(destination)) {
        dispatch(setError(new Error('Invalid destination key')));
        return;
    }

    if (!amount || isNaN(amount) || Number(amount) === 0) {
        dispatch(setError(new Error('Invalid amount')));
        return;
    }

    dispatch(setSending(true));

    const {secretKey} = getState().auth;
    const {issuer} = getState().wollo;
    const asset = getAsset(ASSET_CODE, issuer);

    // TODO: Check that destination account trusts Wollo

    const destAccount = await getServer().loadAccount(destination);
    const isTrusted = getAssetTrusted(destAccount, asset);

    if (!isTrusted) {
        dispatch(setSending(false));
        dispatch(setError(new Error(`Destination account does not trust ${ASSET_CODE}`)));
        return;
    }

    let result;

    try {
        result = await sendPayment(destination, secretKey, amount, memo, asset);
    } catch (e) {
        console.error(e);
    }

    if (!result) {
        dispatch(setSending(false));
        dispatch(setError(new Error('Transfer failed')));
        return;
    }

    dispatch(setSending(false));
    dispatch(setError(null));
    // dispatch(notify('Transfer complete'));
};
