import Storage from '../utils/storage';
import {loadAccount, sendPayment, getServer, Keypair, TransactionBuilder, Operation, Memo} from '@pigzbe/stellar-utils';
import {createKidAccount, getAccountBalance, fundKidAccount, getWolloBalance, updateBalance} from './';
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
import {
    TRANSFER_TYPE_TASK,
    TRANSFER_TYPE_GIFT,
    TRANSFER_TYPE_ALLOWANCE,
    TRANSFER_TYPE_COMPLETION,
} from 'app/constants/game';
import {completeTask} from './';

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

            // Load their goal balances too
            for (const goal of kid.goals) {
                dispatch(updateBalance(goal.address));
            }
            dispatch(updateBalance(kid.home));
        }
    } catch (error) {
        console.log(error);
    }
};

const getType = memo => {
    const id = memo.slice(0, 4).toLowerCase();
    switch (id) {
        case 'allo':
            return TRANSFER_TYPE_ALLOWANCE;
        case 'from':
            return TRANSFER_TYPE_GIFT;
        case 'task':
            return TRANSFER_TYPE_TASK;
        default:
            return null;

    }
};

const isCompletion = record => record.memo && record.memo_type === 'hash';

const isEntry = record => record.memo && record.memo_type === 'text' && getType(record.memo);

const toHex = memo => new Buffer(memo, 'base64').toString('hex');

const getMemo = record => (record.memo_type === 'hash' ? toHex(record.memo) : record.memo);

const getPayment = async transaction => {
    const operations = await transaction.operations();
    return operations.records.find(o => o.type === 'payment');
};

const loadRecords = async (address, pagingToken) => {
    const txs = await getServer().transactions()
        .forAccount(address)
        .cursor(pagingToken)
        .order('asc')
        .limit(100)
        .call();

    const records = txs.records;

    const newPagingToken = records.length ? records[records.length - 1].paging_token : pagingToken;

    const relevantRecords = records.filter(r => isCompletion(r) || isEntry(r));

    const newRecords = [];
    for (const record of relevantRecords) {
        const {amount} = await getPayment(record);
        console.log('new record:', amount, getMemo(record));
        newRecords.push({
            amount,
            memo: getMemo(record),
            type: isCompletion(record) ? TRANSFER_TYPE_COMPLETION : getType(record.memo),
            hash: record.hash,
            date: record.created_at,
        });
    }

    return {newRecords, newPagingToken};
};

export const loadKidActions = address => async dispatch => {
    console.log('loadKidActions', address);
    const actions = [];
    try {
        const account = await loadAccount(address);
        console.log('unclaimed balance = ', getWolloBalance(account));

        const data = await Storage.load(`records_${address}`);
        const {pagingToken = '0', records = []} = data;

        console.log('SAVED DATA:');
        console.log('  pagingToken', pagingToken);
        console.log('  records', records);

        const newData = await loadRecords(address, pagingToken);

        const {newRecords, newPagingToken} = newData;

        console.log('newPagingToken', newPagingToken);
        console.log('newRecords', newRecords);

        const allRecords = records.concat(newRecords);

        console.log('allRecords', allRecords);

        await Storage.save(`records_${address}`, {
            pagingToken: newPagingToken,
            records: allRecords
        });

        const entries = allRecords.filter(r => r.type !== TRANSFER_TYPE_COMPLETION);
        const completions = allRecords.filter(r => r.type === TRANSFER_TYPE_COMPLETION);

        console.log('num entries', entries.length);
        console.log('num completions', completions.length);

        for (const entry of entries) {
            console.log('entry', entry);
            console.log('date', moment(entry.date).format('LLL'));
            const entryCompletions = completions.filter(c => c.memo === entry.hash);
            const entryClaimed = !!entryCompletions.length;
            let amountClaimed = new BigNumber(0);
            if (entryClaimed) {
                for (const completion of entryCompletions) {
                    amountClaimed = amountClaimed.plus(completion.amount);
                }
            }
            const amountLeftToClaim = new BigNumber(entry.amount).minus(amountClaimed);

            if (amountLeftToClaim.isGreaterThan(0)) {
                actions.push({
                    ...entry,
                    amount: amountLeftToClaim.toString(10),
                    totalAmount: entry.amount,
                });
            }
        }

    } catch (e) {
        console.log(e);
    }

    dispatch({type: KIDS_UPDATE_ACTIONS, address, actions});

    return actions;
};

export const claimWollo = (address, destination, hash, amount, amountLeftAfterUpdate) => async (dispatch, getState) => {
    console.log('claimWollo', destination, hash, amount, amountLeftAfterUpdate);

    try {
        dispatch(kidsLoading(true));

        if (amountLeftAfterUpdate === 0) {
            dispatch({type: KIDS_COMPLETE_ACTION, address, hash});
            dispatch(completeTask(address, hash));
        }

        const account = await loadAccount(address);
        console.log('account', account);
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

        dispatch(kidsLoading(false));

    } catch (e) {
        console.log(e);
    }
};
