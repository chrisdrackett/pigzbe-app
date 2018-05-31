import {getServer, setServer} from '../stellar/server';
import {ASSET_CODE} from '../constants';

export const WOLLO_SET_LOADING = 'WOLLO_SET_LOADING';
export const WOLLO_SET_ERROR = 'WOLLO_SET_ERROR';
export const WOLLO_USE_TESTNET = 'WOLLO_USE_TESTNET';
export const WOLLO_UPDATE_ACCOUNT = 'WOLLO_UPDATE_ACCOUNT';
export const WOLLO_UPDATE_BALANCE = 'WOLLO_UPDATE_BALANCE';
export const WOLLO_UPDATE_PAYMENTS = 'WOLLO_UPDATE_PAYMENTS';

export const getWolloBalance = account => {
    const wollo = account.balances.find(b => b.asset_code === ASSET_CODE);
    return wollo ? wollo.balance : '0';
};

const setLoading = loading => ({type: WOLLO_SET_LOADING, loading});
const setError = error => ({type: WOLLO_SET_ERROR, error});

export const setUseTestnet = useTestnet => dispatch => {
    setServer(useTestnet);
    dispatch({type: WOLLO_USE_TESTNET, useTestnet});
};

const updateBalance = balance => ({type: WOLLO_UPDATE_BALANCE, balance});

export const loadAccount = publicKey => dispatch => {
    return getServer().loadAccount(publicKey)
        .then(account => {
            dispatch({type: WOLLO_UPDATE_ACCOUNT, account});
            dispatch(updateBalance(getWolloBalance(account)));
            return account;
        });
};


const getPaymentInfo = async (payment, publicKey) => {
    let {amount, from, to} = payment;
    let direction = from === publicKey ? 'out' : 'in';
    let address = from === publicKey ? payment.to : payment.from;

    const assetCode = payment.asset_code || 'XLM';
    const date = payment.created_at;
    const link = payment._links.self.href;

    if (payment.type === 'create_account') {
        from = payment.funder;
        to = payment.account;
        address = payment.funder;
        amount = payment.starting_balance;
        direction = 'in';
    }

    if (payment.type === 'account_merge') {
        direction = payment.account === publicKey ? 'out' : 'in';
        address = payment.account === publicKey ? payment.into : payment.account;
        amount = '[account merge]';
    }

    const transaction = await payment.transaction();

    const memo = transaction.memo_type === 'text' ? transaction.memo : '';

    return {
        date,
        amount,
        assetCode,
        direction,
        from,
        to,
        address,
        memo,
        link,
    };
};

export const loadPayments = () => (dispatch, getState) => {
    const {publicKey} = getState().auth;

    dispatch(setLoading(true));
    dispatch(setError(null));

    return getServer().payments()
        .forAccount(publicKey)
        .order('desc')
        .limit(100)
        .call()
        .then(payments => payments.records)
        .then(payments => payments.filter(payment => payment.type !== 'account_merge'))
        .then(payments => Promise.all(payments.map(p => getPaymentInfo(p))))
        .then(payments => dispatch({type: WOLLO_UPDATE_PAYMENTS, payments}))
        .catch(error => {
            console.log(error);
            dispatch(setError(error));
        })
        .finally(() => dispatch(setLoading(false)));
};
