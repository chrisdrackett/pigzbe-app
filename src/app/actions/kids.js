import Storage from '../utils/storage';
import {loadAccount, sendPayment, getServer, Keypair, TransactionBuilder, Operation, Memo, ensureValidAmount} from '@pigzbe/stellar-utils';
import {createKidAccount, createHomeAccount, fundKidAccount, getWolloBalance, updateBalance, refreshBalance} from './';
import {wolloAsset} from '../selectors';
import wait from '../utils/wait';
import Keychain from '../utils/keychain';
import BigNumber from 'bignumber.js';
import {
    STORAGE_KEY_KIDS,
    KID_WALLET_BALANCE_XLM,
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

        const home = await dispatch(createHomeAccount(KID_HOME_MEMO_PREPEND, nickname, address));
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

export const restoreKid = (name, address, home, goals) => async dispatch => {
    dispatch(kidsLoading(true));

    dispatch(({type: KIDS_ADD_KID, kid: {
        name,
        address,
        home,
        goals
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
    dispatch(refreshBalance());
};

export const updateKidBalance = (address, balance) => ({type: KIDS_BALANCE_UPDATE, address, balance});

export const loadKidsBalances = (address, waitSeconds = 0) => async (dispatch, getState) => {
    try {
        await wait(waitSeconds);
        const kids = getState().kids.kids.filter(k => !address || k.address === address);
        for (const kid of kids) {
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
        const payment = await getPayment(record);
        const {amount, to} = payment;
        // console.log('new record:', amount, getMemo(record));
        // console.log('  record', record);
        // console.log('  payment', payment);
        newRecords.push({
            amount,
            to,
            memo: getMemo(record),
            type: isCompletion(record) ? TRANSFER_TYPE_COMPLETION : getType(record.memo),
            hash: record.hash,
            date: record.created_at,
        });
    }

    return {newRecords, newPagingToken};
};

export const loadKidActions = address => async (dispatch, getState) => {
    console.log('loadKidActions', address);
    // await Storage.clear(`records_${address}`);
    const actions = [];
    try {
        const account = await loadAccount(address);
        console.log('unclaimed balance = ', getWolloBalance(account));

        const data = await Storage.load(`records_${address}`);
        const {pagingToken = '0', records = []} = data;

        // console.log('SAVED DATA:');
        // console.log('  pagingToken', pagingToken);
        // console.log('  records', records);

        const newData = await loadRecords(address, pagingToken);

        const {newRecords, newPagingToken} = newData;

        // console.log('newPagingToken', newPagingToken);
        // console.log('newRecords', newRecords);

        const allRecords = records.concat(newRecords);

        // console.log('allRecords', allRecords);

        await Storage.save(`records_${address}`, {
            pagingToken: newPagingToken,
            records: allRecords
        });

        const entries = allRecords.filter(r => r.type !== TRANSFER_TYPE_COMPLETION);
        const completions = allRecords.filter(r => r.type === TRANSFER_TYPE_COMPLETION);

        // console.log('num entries', entries.length);
        // console.log('num completions', completions.length);

        for (const entry of entries) {
            // console.log('entry', entry);
            // console.log('date', moment(entry.date).format('LLL'));
            const entryCompletions = completions.filter(c => c.memo === entry.hash);
            // console.log('entryCompletions', entryCompletions);
            console.log('===>', entry.memo, '(', entry.amount, ')');
            const entryClaimed = !!entryCompletions.length;
            let amountClaimed = new BigNumber(0);
            if (entryClaimed) {
                for (const completion of entryCompletions) {
                    amountClaimed = amountClaimed.plus(completion.amount);
                    const kid = getState().kids.kids.find(k => k.address === address);
                    const dest = completion.to === kid.home ? 'Home tree' : kid.goals.find(g => g.address === completion.to).name;
                    console.log('    ', completion.amount, 'WLO set to', dest);
                }
            }
            const amountLeftToClaim = new BigNumber(entry.amount).minus(amountClaimed);
            console.log('     amount left =', amountLeftToClaim.toString(10));

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

export const claimWollo = (address, transfers) => async (dispatch, getState) => {
    console.log('claimWollo');

    // TODO: before send check if already claimed!

    try {
        dispatch(kidsLoading(true));

        const {actions} = getState().kids.kids.find(k => k.address === address);

        const mergedTransfers = Object.values(transfers.reduce((ob, t) => {
            const {destination, hash, amount} = t;
            const key = `${destination}${hash}`;
            if (ob[key]) {
                ob[key].amount = new BigNumber(ob[key].amount).plus(new BigNumber(amount)).toString(10);
            } else {
                ob[key] = {...t};
            }

            return ob;
        }, {}));

        const sanitisedTransfers = mergedTransfers.map(transfer => {
            const action = actions.find(a => a.hash === transfer.hash);
            return {
                ...transfer,
                amount: BigNumber.min(action.amount, transfer.amount).toString(10)
            };
        });

        const actionsComplete = actions.reduce((arr, action) => {
            const actionTransfers = sanitisedTransfers.filter(t => t.hash === action.hash);
            if (actionTransfers.length) {
                const totalAmount = actionTransfers.reduce((sum, transfer) => sum.plus(transfer.amount), new BigNumber(0));
                console.log('totalAmount', totalAmount.toString(10));
                const complete = totalAmount.isEqualTo(action.amount);
                console.log('complete', complete);
                if (complete) {
                    console.log('-->', action.memo, 'is complete');
                    return arr.concat({...action});
                }
            }
            return arr;
        }, []);

        console.log('transfers', transfers);
        console.log('mergedTransfers', mergedTransfers);
        console.log('sanitisedTransfers', sanitisedTransfers);
        console.log('actionsComplete', actionsComplete);

        for (const action of actionsComplete) {
            const {hash, memo} = action;

            dispatch({type: KIDS_COMPLETE_ACTION, address, hash});

            if (getType(memo) === TRANSFER_TYPE_TASK) {
                dispatch(completeTask(address, hash));
            }
        }

        const kidSecretKey = await Keychain.load(`secret_${address}`);
        console.log('kidSecretKey', kidSecretKey);
        const keypair = Keypair.fromSecret(kidSecretKey);

        const account = await loadAccount(address);
        console.log('account', account);
        console.log('available balance', getWolloBalance(account));
        const asset = wolloAsset(getState());

        for (const transfer of sanitisedTransfers) {
            const {destination, amount, hash} = transfer;
            console.log('destination, amount', destination, amount);
            const txb = new TransactionBuilder(account);
            txb.addOperation(Operation.payment({
                destination,
                asset,
                amount: ensureValidAmount(amount)
            }));
            txb.addMemo(Memo.hash(hash));
            const tx = txb.build();
            tx.sign(keypair);
            const result = await getServer().submitTransaction(tx);
            console.log('result', result);
        }

        await dispatch(loadKidActions(address));

        // refresh just the goals that have been changed
        for (const transfer of sanitisedTransfers) {
            await dispatch(updateBalance(transfer.destination));
        }


    } catch (e) {
        console.log(e);
    }

    dispatch(kidsLoading(false));
};
