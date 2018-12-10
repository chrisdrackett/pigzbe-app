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
    Keypair,
    Operation,
    Memo
} from '@pigzbe/stellar-utils';
import {
    strings,
    ASSET_CODE,
    INFLATION_DEST,
    MEMO_PREPEND_CREATE,
    MEMO_PREPEND_DELETE,
    KID_WALLET_BALANCE_XLM,
    CURRENCIES,
    HORIZON_FALLBACK
} from 'app/constants';
import {wolloAsset} from 'app/selectors';
import {createKeypair, appError, updateKidBalance, loadSecretKey, saveSecretKey} from './';
import formatMemo from 'app/utils/format-memo';

export const WALLET_LOADING = 'WALLET_LOADING';
export const WALLET_ERROR = 'WALLET_ERROR';
export const WALLET_UPDATE_ACCOUNT = 'WALLET_UPDATE_ACCOUNT';
export const WALLET_UPDATE_BALANCE = 'WALLET_UPDATE_BALANCE';
export const WALLET_UPDATE_XLM = 'WALLET_UPDATE_XLM';
export const WALLET_UPDATE_PAYMENTS = 'WALLET_UPDATE_PAYMENTS';
export const WALLET_SENDING = 'WALLET_SENDING';
export const WALLET_SEND_COMPLETE = 'WALLET_SEND_COMPLETE';
export const WALLET_SEND_STATUS = 'WALLET_SEND_STATUS';
export const WALLET_SEND_RESET = 'WALLET_SEND_RESET';
export const WALLET_KEYPAIR = 'WALLET_KEYPAIR';
export const WALLET_KEYPAIR_SAVED = 'WALLET_KEYPAIR_SAVED';
export const WALLET_SET_SELECTED_TOKEN = 'WALLET_SET_SELECTED_TOKEN';

export const getWolloBalance = account => getBalance(account, ASSET_CODE);

export const walletLoading = loading => ({type: WALLET_LOADING, loading});
export const walletSending = sending => ({type: WALLET_SENDING, sending});
export const walletSendComplete = sendComplete => ({type: WALLET_SEND_COMPLETE, sendComplete});
export const walletSendStatus = sendStatus => ({type: WALLET_SEND_STATUS, sendStatus});
export const walletSendReset = () => ({type: WALLET_SEND_RESET});

export const walletError = error => ({type: WALLET_ERROR, error});

export const setHorizonURI = uri => async () => {
    console.log('setHorizonURI:', uri);
    if (uri.includes('pigzbe.com')) {
        const result = await fetch(uri);
        console.log('check horizon status', uri, result.ok);
        if (!result.ok) {
            uri = HORIZON_FALLBACK;
        }
    }
    setServer(uri);
};

const updateBalance = balance => ({type: WALLET_UPDATE_BALANCE, balance});

const handleTransferError = errorMessage => dispatch => {
    dispatch(walletSending(false));
    dispatch(walletSendStatus(null));
    dispatch(walletError(errorMessage));
    dispatch(appError(errorMessage));
};

const updateXLM = account => dispatch => {
    const balance = getBalance(account);
    const minBalance = getMinBalance(account, 1);
    const hasGas = checkHasGas(account);

    dispatch({type: WALLET_UPDATE_XLM, balance, minBalance, hasGas});
};

const trustWollo = async (account, secretKey, asset) => {
    try {
        const isTrusted = checkAssetTrusted(account, asset);
        if (!isTrusted) {
            await trustAsset(secretKey, asset);
        }
    } catch (e) {
        console.log(e);
    }
};

const setInflationDest = async (account, secretKey) => {
    try {
        if (!account.inflation_destination) {
            const txb = new TransactionBuilder(account);
            txb.addOperation(Operation.setOptions({
                inflationDest: INFLATION_DEST
            }));
            const transaction = txb.build();
            const keypair = Keypair.fromSecret(secretKey);
            transaction.sign(keypair);
            await submitTransaction(transaction);
        }
    } catch (e) {
        console.log(e);
    }
};

export const loadWallet = publicKey => async (dispatch, getState) => {
    console.log('loadWallet', publicKey);
    const key = publicKey || getState().keys.publicKey;
    try {
        if (key) {
            const account = await loadAccount(key);
            console.log('account', account);
            dispatch({type: WALLET_UPDATE_ACCOUNT, account});
            dispatch(updateBalance(getWolloBalance(account)));

            const {secretKey} = getState().keys;

            await trustWollo(account, secretKey, wolloAsset(getState()));
            await setInflationDest(account, secretKey);

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
            dispatch({type: WALLET_UPDATE_ACCOUNT, account});
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

    dispatch(walletLoading(true));
    dispatch(walletError(null));

    try {
        const rawData = await paymentHistory(key);
        const filteredData = rawData.filter(p => p.type !== 'account_merge');
        const payments = await Promise.all(filteredData.map(p => paymentInfo(p, key)));
        dispatch({type: WALLET_UPDATE_PAYMENTS, payments});
    } catch (error) {
        console.log(error);
    }

    dispatch(walletLoading(false));
};


export const sendTokens = (tokenCode, destination, amount, memo) => async (dispatch, getState) => {
    console.log('sendTokens', tokenCode, destination, amount, memo);
    try {
        if (!isValidPublicKey(destination)) {
            dispatch(walletError(strings.transferErrorInvalidKey));
            dispatch(appError(strings.transferErrorInvalidKey));
            return;
        }

        if (!amount || isNaN(amount) || Number(amount) === 0) {
            dispatch(walletError(strings.transferErrorInvalidAmount));
            dispatch(appError(strings.transferErrorInvalidAmount));
            return;
        }

        dispatch(walletError(null));
        dispatch(walletSendComplete(false));
        dispatch(walletSending(true));
        dispatch(walletSendStatus(strings.transferStatusChecking));

        const {secretKey, publicKey} = getState().keys;

        let destAccount;

        let asset;

        if (tokenCode === ASSET_CODE) {
            try {
                destAccount = await loadAccount(destination);
            } catch (e) {
                console.log(e);
            }

            console.log('--- destAccount ---', destAccount);

            if (!destAccount) {
                console.log('--- !destAccount ---', destAccount);
                dispatch(handleTransferError(strings.transferStatusInvalidDestination));
                return;
            }

            asset = wolloAsset(getState());

            const isTrusted = checkAssetTrusted(destAccount, asset);

            if (!isTrusted) {
                dispatch(handleTransferError(strings.transferErrorTrust));
                return;
            }
        }

        dispatch(walletSendStatus(`Sending ${CURRENCIES[tokenCode].name}`));

        let result;

        try {
            result = await sendPayment(secretKey, destination, amount, memo, asset);
        } catch (e) {
            console.log(e.response);
            if (tokenCode !== ASSET_CODE && Number(amount) >= 1) {
                result = await createAccount(secretKey, destination, amount, memo);
            }
        }

        if (!result) {
            dispatch(handleTransferError(strings.transferStatusFailed));
            return;
        }

        dispatch(refreshBalance());
        dispatch(walletSending(false));
        dispatch(walletSendComplete(true));
        dispatch(walletSendStatus(strings.transferStatusComplete));
        dispatch(walletError(null));
        dispatch(loadWallet(publicKey));
    } catch (e) {
        console.log(e.response);
        dispatch(handleTransferError(strings.transferStatusFailed));
    }
};

export const fundKidAccount = (memo, address, startingBalance) => async (dispatch, getState) => {
    console.log('fundKidAccount', memo, address, startingBalance);
    // const {publicKey, secretKey} = getState().keys;
    const {secretKey} = getState().keys;
    const kidSecretKey = await dispatch(loadSecretKey(address));
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
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
};

export const createKidAccount = (nickname, parentNickname) => async dispatch => {
    console.log('createKidAccount', nickname);

    try {
        const keypair = await dispatch(createKeypair());
        const destination = keypair.publicKey();
        console.log('createKidAccount destination', destination);

        await dispatch(saveSecretKey(destination, keypair.secret()));

        console.log('createKidAccount startingBalance', KID_WALLET_BALANCE_XLM);

        const memo = formatMemo(`${MEMO_PREPEND_CREATE}${nickname}~${parentNickname}`);

        const success = await dispatch(fundKidAccount(memo, destination, KID_WALLET_BALANCE_XLM));

        return success ? destination : null;

    } catch (error) {
        console.log(error);
    }

    return null;
};

export const setSelectedToken = code => ({type: WALLET_SET_SELECTED_TOKEN, code});

export const mergeKidWallet = kid => async (dispatch, getState) => {
    console.log('mergeKidWallet', kid);

    const {name, address} = kid;
    const {publicKey} = getState().keys;

    try {
        let account = null;

        try {
            account = await loadAccount(address);
        } catch (e) {
            return {success: false, error: 'Account not found'};
        }

        const secretKey = await dispatch(loadSecretKey(address));
        const keypair = Keypair.fromSecret(secretKey);

        const memo = formatMemo(`${MEMO_PREPEND_DELETE}${name}`);

        const wloAmount = getWolloBalance(account);
        const asset = wolloAsset(getState());

        try {
            if (Number(wloAmount) > 0) {
                await sendPayment(secretKey, publicKey, wloAmount, memo, asset);
                account = await loadAccount(address);
            }
        } catch (e) {
            console.log(e.response || e);
            return {success: false, error: 'Failed to send Wollo'};
        }

        try {
            const txbT = new TransactionBuilder(account);
            txbT.addOperation(Operation.changeTrust({
                asset,
                limit: '0'
            }));
            const txT = txbT.build();
            txT.sign(keypair);
            await submitTransaction(txT);
            account = await loadAccount(address);
        } catch (e) {
            console.log(e.response || e);
            return {success: false, error: 'Failed to remove trustline'};
        }

        try {
            const txb = new TransactionBuilder(account);
            txb.addOperation(Operation.accountMerge({
                destination: publicKey
            }));
            txb.addMemo(Memo.text(memo));
            const tx = txb.build();
            tx.sign(keypair);
            await submitTransaction(tx);
        } catch (e) {
            console.log(e.response || e);
            return {success: false, error: 'Failed to merge account'};
        }
    } catch (e) {
        console.log(e);
        return {success: false, error: 'Failed to delete account'};
    }
    return {success: true};
};
