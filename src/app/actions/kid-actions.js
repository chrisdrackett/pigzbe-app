import Storage from '../utils/storage';
import Keychain from '../utils/keychain';
import BigNumber from 'bignumber.js';
import {loadAccount, getServer, Keypair, TransactionBuilder, Operation, Memo, ensureValidAmount} from '@pigzbe/stellar-utils';
import {getWolloBalance, updateBalance, kidsLoading, completeTask} from './';
import {
    TRANSFER_TYPE_TASK,
    TRANSFER_TYPE_GIFT,
    TRANSFER_TYPE_ALLOWANCE,
    TRANSFER_TYPE_COMPLETION,
} from 'app/constants/game';
import {
    MEMO_PREPEND_TASK,
    MEMO_PREPEND_GIFT,
    MEMO_PREPEND_ALLOWANCE
} from 'app/constants';
import {wolloAsset} from '../selectors';

export const KIDS_UPDATE_ACTIONS = 'KIDS_UPDATE_ACTIONS';
export const KIDS_COMPLETE_ACTION = 'KIDS_COMPLETE_ACTION';

const getType = memo => {
    if (memo.indexOf(MEMO_PREPEND_ALLOWANCE) === 0) {
        return TRANSFER_TYPE_ALLOWANCE;
    }
    if (memo.indexOf(MEMO_PREPEND_GIFT) === 0) {
        return TRANSFER_TYPE_GIFT;
    }
    if (memo.indexOf(MEMO_PREPEND_TASK) === 0) {
        return MEMO_PREPEND_TASK;
    }
    return null;
};

const isCompletion = record => record.memo && record.memo_type === 'hash';

const isEntry = record => record.memo && record.memo_type === 'text' && getType(record.memo);

const toHex = memo => new Buffer(memo, 'base64').toString('hex');

const getMemo = record => (record.memo_type === 'hash' ? toHex(record.memo) : record.memo);

// const getPayment = async transaction => {
//     const operations = await transaction.operations();
//     return operations.records.find(o => o.type === 'payment');
// };

const getPagingToken = (records, pagingToken) => records.length ? records[records.length - 1].paging_token : pagingToken;

const loadPayments = async address => {
    const payments = await Storage.load(`payments_${address}`);
    const {pagingToken = '0', records = []} = payments;

    console.log('loadPayments', pagingToken);

    const result = await getServer().payments()
        .forAccount(address)
        .cursor(pagingToken)
        .order('asc')
        .limit(100)
        .call();

    const newPagingToken = getPagingToken(result.records, pagingToken);

    const newRecords = result.records.map(r => ({
        hash: r.transaction_hash,
        amount: r.amount,
        to: r.to
    }));

    const allRecords = records.concat(newRecords);

    await Storage.save(`payments_${address}`, {
        pagingToken: newPagingToken,
        records: allRecords
    });

    return allRecords;
};

const loadRecords = async address => {
    const payments = await loadPayments(address);

    const transactions = await Storage.load(`transactions_${address}`);
    const {pagingToken = '0', records = []} = transactions;

    console.log('loadRecords', pagingToken);

    const result = await getServer().transactions()
        .forAccount(address)
        .cursor(pagingToken)
        .order('asc')
        .limit(100)
        .call();

    const newPagingToken = getPagingToken(result.records, pagingToken);

    const newRecords = result.records
        .filter(r => isCompletion(r) || isEntry(r))
        .map(r => {
            const payment = payments.find(p => p.hash === r.hash);
            const {amount, to} = payment;
            return {
                amount,
                to,
                memo: getMemo(r),
                type: isCompletion(r) ? TRANSFER_TYPE_COMPLETION : getType(r.memo),
                hash: r.hash,
                date: r.created_at,
            };
        });

    const allRecords = records.concat(newRecords);

    await Storage.save(`transactions_${address}`, {
        pagingToken: newPagingToken,
        records: allRecords
    });

    return allRecords;
};

export const loadKidActions = address => async (dispatch, getState) => {
    console.log('loadKidActions', address);
    // await Storage.clear(`payments_${address}`);
    // await Storage.clear(`transactions_${address}`);
    const actions = [];
    try {
        const account = await loadAccount(address);
        console.log('unclaimed balance = ', getWolloBalance(account));

        const allRecords = await loadRecords(address);

        const entries = allRecords.filter(r => r.type !== TRANSFER_TYPE_COMPLETION);
        const completions = allRecords.filter(r => r.type === TRANSFER_TYPE_COMPLETION);

        console.log('num entries', entries.length);
        console.log('num completions', completions.length);

        for (const entry of entries) {
            console.log('entry', entry);
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

    const tasks = actions.filter(a => a.type === TRANSFER_TYPE_TASK);
    const gifts = actions.filter(a => a.type === TRANSFER_TYPE_GIFT);
    const allowances = actions.filter(a => a.type === TRANSFER_TYPE_ALLOWANCE);

    console.log('tasks', tasks);
    console.log('gifts', gifts);
    console.log('allowances', allowances);

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
