import Storage from '../utils/storage';
import {loadAccount, sendPayment, getServer, Keypair, TransactionBuilder, Operation, Memo} from '@pigzbe/stellar-utils';
import {createKidAccount, getAccountBalance, fundKidAccount, getWolloBalance} from './';
import {wolloAsset} from '../selectors';
import wait from '../utils/wait';
import Keychain from '../utils/keychain';
import BigNumber from 'bignumber.js';
import moment from 'moment';
import {
    STORAGE_KEY_KIDS,
    KID_WALLET_BALANCE_XLM,
    KID_HOME_BALANCE_XLM,
    KID_ADD_MEMO_PREPEND,
    KID_HOME_MEMO_PREPEND
} from '../constants';

export const KIDS_LOAD = 'KIDS_LOAD';
export const KIDS_LOADING = 'KIDS_LOADING';
export const KIDS_PARENT_NICKNAME = 'KIDS_PARENT_NICKNAME';
export const KIDS_NUM_TO_ADD = 'KIDS_NUM_TO_ADD';
export const KIDS_ADD_KID = 'KIDS_ADD_KID';
export const KIDS_SENDING_WOLLO = 'KIDS_SENDING_WOLLO';
export const KIDS_SEND_ERROR = 'KIDS_SEND_ERROR';
export const KIDS_SEND_COMPLETE = 'KIDS_SEND_COMPLETE';
export const KIDS_BALANCE_UPDATE = 'KIDS_BALANCE_UPDATE';
export const KIDS_UPDATE_ACTIONS = 'KIDS_UPDATE_ACTIONS';
export const KIDS_COMPLETE_ACTION = 'KIDS_COMPLETE_ACTION';

const kidsLoading = value => ({type: KIDS_LOADING, value});

export const loadKids = () => async dispatch => {
    console.log('loadKids');
    try {
        const data = await Storage.load(STORAGE_KEY_KIDS);
        // console.log('data', data);
        // console.log(JSON.stringify(data, null, 2));
        dispatch({type: KIDS_LOAD, ...data});
    } catch (error) {
        console.log(error);
    }
};

export const saveKids = () => async (dispatch, getState) => {
    try {
        const data = getState().kids;
        await Storage.save(STORAGE_KEY_KIDS, data);
    } catch (error) {
        console.log(error);
    }
};

export const setParentNickname = parentNickname => ({type: KIDS_PARENT_NICKNAME, parentNickname});

export const setNumKidsToAdd = numKidsToAdd => ({type: KIDS_NUM_TO_ADD, numKidsToAdd});

export const addKid = (nickname, dob, photo) => async dispatch => {
    dispatch(kidsLoading(true));
    try {
        const address = await dispatch(createKidAccount(KID_ADD_MEMO_PREPEND, nickname, KID_WALLET_BALANCE_XLM));
        if (!address) {
            throw new Error('Could not create kid account');
        }

        const home = await dispatch(createKidAccount(KID_HOME_MEMO_PREPEND, nickname, KID_HOME_BALANCE_XLM));
        if (!home) {
            throw new Error('Could not create kid home account');
        }

        dispatch(({type: KIDS_ADD_KID, kid: {name: nickname, dob, photo, address, home, balance: '0'}}));
        await dispatch(saveKids());

    } catch (error) {
        console.log(error);
    }
    dispatch(kidsLoading(false));
};

export const restoreKid = (name, address, account) => async dispatch => {
    dispatch(kidsLoading(true));

    dispatch(({type: KIDS_ADD_KID, kid: {
        name,
        address,
        balance: getWolloBalance(account),
    }}));
    await dispatch(saveKids());
    dispatch(kidsLoading(false));
};

const sendingWolloToKid = address => ({type: KIDS_SENDING_WOLLO, address});
const sendError = error => ({type: KIDS_SEND_ERROR, error});
const sendComplete = address => ({type: KIDS_SEND_COMPLETE, address});

export const sendWolloToKid = (address, amount) => async (dispatch, getState) => {
    dispatch(sendError(null));
    dispatch(sendComplete(null));
    dispatch(sendingWolloToKid(address));
    try {
        await loadAccount(address);
    } catch (e) {
        console.log('Could not load account. Attemptiung to fund');
        const name = getState().kids.kids.find(k => k.address === address).name;
        await dispatch(fundKidAccount(`${KID_ADD_MEMO_PREPEND}${name}`, address, KID_WALLET_BALANCE_XLM));
    }
    try {
        const {parentNickname} = getState().kids;
        const memo = `From ${parentNickname || 'Parent'}`;
        const asset = wolloAsset(getState());
        const {secretKey} = getState().keys;
        await sendPayment(secretKey, address, amount, memo, asset);
        dispatch(sendComplete(address));
    } catch (error) {
        console.log(error);
        dispatch(sendError(new Error('Failed to send Wollo')));
    }
    dispatch(loadKidsBalances(address, 1));
    dispatch(sendingWolloToKid(null));
};

export const updateKidBalance = (address, balance) => ({type: KIDS_BALANCE_UPDATE, address, balance});

export const loadKidsBalances = (address, waitSeconds = 0) => async (dispatch, getState) => {
    try {
        await wait(waitSeconds);
        const kids = getState().kids.kids.filter(k => !address || k.home === address);
        for (const kid of kids) {
            const balance = await dispatch(getAccountBalance(kid.home));
            dispatch(updateKidBalance(kid.address, balance));
        }
    } catch (error) {
        console.log(error);
    }
};

const getType = memo => {
    const id = memo.slice(0, 4).toLowerCase();
    switch (id) {
        case 'allo':
            return 'allowance';
        case 'from':
            return 'gift';
        case 'task':
            return 'task';
        default:
            return null;

    }
};

export const loadKidActions = address => async dispatch => {
    console.log('loadKidActions', address);
    const actions = [];
    try {
        // const account = await loadAccount(publicKey);
        // console.log('unclaimed balance = ', getWolloBalance(account));

        const data = await Storage.load(`records_${address}`);
        // data.entries
        // data.completions
        // data.pagingToken;
        const {pagingToken = '0'} = data;

        console.log('pagingToken', pagingToken);

        const txs = await getServer().transactions()
            .forAccount(address)
            .cursor(pagingToken)
            .order('asc')
            .limit(100)
            .call();

        const records = txs.records;

        if (records.length) {
            console.log('new pagingToken:', records.slice(-1).paging_token);
        }

        // filter existing entries by amount left to claim > 0

        // TODO: store entries and completetions in short format
        // for new entries map to format first and then compare

        const entries = records.filter(r => r.memo && r.memo_type === 'text' && getType(r.memo));
        const completions = records.filter(r => r.memo && r.memo_type === 'hash');

        // console.log('num entries', entries.length);
        // console.log('num completions', completions.length);

        for (const entry of entries) {
            console.log('entry', entry);
            console.log('date', moment(entry.created_at).format('LLL'));
            const entryCompletions = completions.filter(c => new Buffer(c.memo, 'base64').toString('hex') === entry.hash);
            const entryClaimed = !!entryCompletions.length;
            let amountClaimed = new BigNumber(0);
            if (entryClaimed) {
                for (const completion of entryCompletions) {
                    const {amount} = await getPayment(completion);
                    amountClaimed = amountClaimed.plus(amount);
                }
            }
            const {amount} = await getPayment(entry);
            const amountLeftToClaim = new BigNumber(amount).minus(amountClaimed);

            if (amountLeftToClaim.isGreaterThan(0)) {
                actions.push({
                    memo: entry.memo,
                    type: getType(entry.memo),
                    amount: amountLeftToClaim.toString(10),
                    totalAmount: new BigNumber(amount).toString(10),
                    hash: entry.hash,
                    date: entry.created_at,
                });
            }
        }

    } catch (e) {
        console.log(e);
    }

    dispatch({type: KIDS_UPDATE_ACTIONS, address, actions});

    return actions;
};

const getPayment = async transaction => {
    const operations = await transaction.operations();
    return operations.records.find(o => o.type === 'payment');
};

export const claimWollo = (address, destination, hash, amount) => async (dispatch, getState) => {
    console.log('claimWollo', destination, hash, amount);

    try {
        const account = await loadAccount(address);
        const asset = wolloAsset(getState());
        const tx = new TransactionBuilder(account)
            .addOperation(Operation.payment({
                destination,
                asset,
                amount
            }))
            .addMemo(Memo.hash(hash))
            .build();

        const kidSecretKey = await Keychain.load(`secret_${address}`);
        console.log('kidSecretKey', kidSecretKey);
        const keypair = Keypair.fromSecret(kidSecretKey);
        tx.sign(keypair);

        const result = await getServer().submitTransaction(tx);
        console.log('result', result);
        await dispatch(loadKidActions(address));
        dispatch(loadKidsBalances(destination));

        // TODO: if amount === totalAmount
        dispatch({type: KIDS_COMPLETE_ACTION, address, hash});

    } catch (e) {
        console.log(e);
    }
};
