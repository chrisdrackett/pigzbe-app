import Storage from '../utils/storage';
import BigNumber from 'bignumber.js';
import {loadAccount, getServer} from '@pigzbe/stellar-utils';
import {getWolloBalance} from './';
import {
    TRANSFER_TYPE_TASK,
    TRANSFER_TYPE_PRESENT,
    TRANSFER_TYPE_ALLOWANCE,
    TRANSFER_TYPE_COMPLETION,
} from 'app/constants/game';
import {
    MEMO_PREPEND_TASK,
    MEMO_PREPEND_PRESENT,
    MEMO_PREPEND_ALLOWANCE
} from 'app/constants';

export const KIDS_UPDATE_ACTIONS = 'KIDS_UPDATE_ACTIONS';

export const getTransferType = memo => {
    if (memo.indexOf(MEMO_PREPEND_ALLOWANCE) === 0) {
        return TRANSFER_TYPE_ALLOWANCE;
    }
    if (memo.indexOf(MEMO_PREPEND_PRESENT) === 0) {
        return TRANSFER_TYPE_PRESENT;
    }
    if (memo.indexOf(MEMO_PREPEND_TASK) === 0) {
        return TRANSFER_TYPE_TASK;
    }
    return null;
};

export const getName = memo => {
    if (memo.indexOf(MEMO_PREPEND_ALLOWANCE) === 0) {
        return memo.slice(MEMO_PREPEND_ALLOWANCE.length);
    }
    if (memo.indexOf(MEMO_PREPEND_PRESENT) === 0) {
        return memo.slice(MEMO_PREPEND_PRESENT.length);
    }
    if (memo.indexOf(MEMO_PREPEND_TASK) === 0) {
        return memo.slice(MEMO_PREPEND_TASK.length);
    }
    return memo;
};

const isCompletion = record => record.memo && record.memo_type === 'hash';

const isEntry = record => record.memo && record.memo_type === 'text' && getTransferType(record.memo);

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

    console.log('loadPayments ( pagingToken =', pagingToken, ')');

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

    console.log('new payments', newRecords.length);

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

    console.log('loadTransactions ( pagingToken =', pagingToken, ')');

    const result = await getServer().transactions()
        .forAccount(address)
        .cursor(pagingToken)
        .order('asc')
        .limit(100)
        .call();

    const newPagingToken = getPagingToken(result.records, pagingToken);

    const newRecords = result.records
        .filter(r => isCompletion(r) || isEntry(r))
        // .filter(r => payments.find(p => p.hash === r.hash))
        .map(r => {
            const payment = payments.find(p => p.hash === r.hash);
            const {amount, to} = payment;
            return {
                amount,
                to,
                name: getName(r.memo),
                memo: getMemo(r),
                type: isCompletion(r) ? TRANSFER_TYPE_COMPLETION : getTransferType(r.memo),
                hash: r.hash,
                date: r.created_at,
            };
        });

    console.log('new records', newRecords.length);

    const allRecords = records.concat(newRecords);

    await Storage.save(`transactions_${address}`, {
        pagingToken: newPagingToken,
        records: allRecords
    });

    return allRecords;
};

export const loadKidActions = address => async (dispatch, getState) => {
    console.log('loadKidActions', address);
    // if (__DEV__) {
    //     await Storage.clear(`payments_${address}`);
    //     await Storage.clear(`transactions_${address}`);
    // }
    const actions = [];
    try {
        const account = await loadAccount(address);
        console.log('');
        console.log('unclaimed balance = ', getWolloBalance(account));

        const allRecords = await loadRecords(address);

        const entries = allRecords.filter(r => r.type !== TRANSFER_TYPE_COMPLETION);
        const completions = allRecords.filter(r => r.type === TRANSFER_TYPE_COMPLETION);

        console.log('num entries', entries.length);
        console.log('num completions', completions.length);

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

                    let dest = 'unknown';
                    const kid = getState().kids.kids.find(k => k.address === address);
                    const goal = kid.goals.find(g => g.address === completion.to);
                    if (goal) {
                        dest = goal.name;
                    } else if (completion.to === kid.home) {
                        dest = 'Home tree';
                    } else if (completion.to === getState().keys.publicKey) {
                        dest = `${getState().kids.parentNickname || 'parent'} (task deleted)`;
                    }
                    console.log('    ', completion.amount, 'WLO sent to', dest);
                }
            }
            const amountLeftToClaim = new BigNumber(entry.amount).minus(amountClaimed);
            console.log('     amount claimed =', amountClaimed.toString(10));
            console.log('     amount left =', amountLeftToClaim.toString(10));
            const incomplete = amountLeftToClaim.isGreaterThan(0);
            const partialClaim = incomplete && amountLeftToClaim.isLessThan(entry.amount);
            console.log('     partialClaim =', partialClaim ? 'true' : 'false');
            console.log('    ', incomplete ? '✘' : '✔', 'complete =', incomplete ? 'false' : 'true');

            if (incomplete) {
                actions.push({
                    ...entry,
                    amount: amountLeftToClaim.toString(10),
                    totalAmount: entry.amount,
                    partialClaim
                });
            }
        }

    } catch (e) {
        console.log(e);
    }


    const tasks = actions.filter(a => a.type === TRANSFER_TYPE_TASK);
    const gifts = actions.filter(a => a.type === TRANSFER_TYPE_PRESENT);
    const allowances = actions.filter(a => a.type === TRANSFER_TYPE_ALLOWANCE);

    dispatch({type: KIDS_UPDATE_ACTIONS, address, actions, tasks});

    console.log('tasks', tasks);
    console.log('gifts', gifts);
    console.log('allowances', allowances);
    console.log('');

    return actions;
};

// export const loadSingleRecord = hash => async (dispatch, getState) => {
//     const transaction = await getServer().transactions().transaction(hash).call();
//     console.log('transaction', transaction);
//     const operations = await transaction.operations();
//     const payment = operations.records.find(o => o.type === 'payment');
//     console.log('payment', payment);
// };
