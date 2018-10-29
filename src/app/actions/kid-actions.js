import Storage from '../utils/storage';
import BigNumber from 'bignumber.js';
import {loadAccount, getServer} from '@pigzbe/stellar-utils';
import {getWolloBalance, KIDS_UPDATE_GOAL, saveKids} from './';
import {
    TRANSFER_TYPE_TASK,
    TRANSFER_TYPE_PRESENT,
    TRANSFER_TYPE_ALLOWANCE,
    // TRANSFER_TYPE_COMPLETION,
} from 'app/constants/game';
import {
    MEMO_PREPEND_TASK,
    MEMO_PREPEND_PRESENT,
    MEMO_PREPEND_ALLOWANCE,
} from 'app/constants';
import moment from 'moment';

export const KIDS_UPDATE_ACTIONS = 'KIDS_UPDATE_ACTIONS';
export const KIDS_GOAL_WOLLO_TRANSACTION = 'KIDS_GOAL_WOLLO_TRANSACTION';
export const KIDS_UPDATE_GOAL_HISTORY = 'KIDS_UPDATE_GOAL_HISTORY';

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
                // name: isCompletion(r) ? TRANSFER_TYPE_COMPLETION : getName(r.memo),
                name: getName(r.memo),
                memo: getMemo(r),
                // type: isCompletion(r) ? TRANSFER_TYPE_COMPLETION : getTransferType(r.memo),
                type: getTransferType(r.memo),
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

export const assignWolloToTree = (kid, goalId, cloudHash, amount) => async dispatch => {
    try {
        const goal = kid.goals.find(g => g.id === goalId);

        // Update the balance on the goal
        dispatch({
            type: KIDS_UPDATE_GOAL,
            kid,
            goal: {
                ...goal,
                balance: new BigNumber(goal.balance).plus(new BigNumber(amount)).toString(10),
            }
        });

        // Add a new transaction for the assignment of wollo to the goal
        dispatch({
            type: KIDS_GOAL_WOLLO_TRANSACTION,
            kid,
            cloudHash,
            amount,
            goalId,
        });

        await dispatch(saveKids());
    } catch (e) {
        console.log(e);
    }
};

export const removeKidAction = (kid, cloudHash) => async dispatch => {
    try {
        const {actions, tasks} = kid;
        const remainingActions = actions.filter(action => action.hash !== cloudHash);
        dispatch({
            type: KIDS_UPDATE_ACTIONS,
            address: kid.address,
            actions: remainingActions,
            tasks,
        });
    } catch (e) {
        console.log(e);
    }
};

export const loadKidActions = kid => async dispatch => {
    const address = kid.address;
    console.log('loadKidActions', address);
    // if (__DEV__) {
    //     await Storage.clear(`payments_${address}`);
    //     await Storage.clear(`transactions_${address}`);
    // }
    const actions = [];
    let entries = [];

    try {
        const account = await loadAccount(address);
        console.log('');
        console.log('unclaimed balance = ', getWolloBalance(account));

        const allRecords = await loadRecords(address);

        // const entries = allRecords.filter(r => r.type !== TRANSFER_TYPE_COMPLETION);
        entries = allRecords;
        //const completions = allRecords.filter(r => r.type === TRANSFER_TYPE_COMPLETION);

        console.log('num entries', entries.length);

        for (const entry of entries) {
            // console.log('entry', entry);
            // console.log('date', moment(entry.date).format('LLL'));

            // Find all goal transactions for this cloud hash
            const entryCompletions = kid.goalTransactions.filter(transaction => transaction.cloudHash === entry.hash);
            console.log('entryCompletions', entryCompletions);
            console.log('===>', entry.memo, '(', entry.amount, entry.date, ')');
            const entryClaimed = !!entryCompletions.length;
            let amountClaimed = new BigNumber(0);
            if (entryClaimed) {
                for (const completion of entryCompletions) {
                    amountClaimed = amountClaimed.plus(completion.amount);

                    let dest = 'unknown';
                    const goal = kid.goals.find(g => g.id === completion.goalId);
                    if (goal) {
                        dest = goal.name;
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

    dispatch({type: KIDS_UPDATE_ACTIONS, address, actions, tasks, entries});

    console.log('tasks', tasks);
    console.log('gifts', gifts);
    console.log('allowances', allowances);
    console.log('');

    dispatch(getTreeHistory(kid.address));

    return actions;
};

const getDateDiff = (a, b) => {
    const prevDate = moment(a);
    const itemDate = moment(b);
    return prevDate.diff(itemDate, 'days');
};

export const getTreeHistory = address => async (dispatch, getState) => {
    console.log('getTreeHistory');
    const kid = getState().kids.kids.find(k => k.address === address);
    // const goal = kid.goals.find(g => g.id === goalId);
    const {entries, goals} = kid;

    // console.log('kid.goalTransactions', kid.goalTransactions);
    const parent = getState().kids.parentNickname || 'parent';

    for (const goal of goals) {
        console.log('goal', goal.name);
        const history = kid.goalTransactions
            .filter(t => t.goalId === goal.id || t.fromGoalId === goal.id)
            .map(t => {
                if (t.toParent) {
                    // console.log('t', t);
                    // const fromGoal = goals.find(g => g.id === t.fromGoalId);
                    return {
                        hash: null,
                        memo: `Sent to ${parent}`,
                        amount: t.amount,
                        date: t.date,
                        direction: 'out',
                    };
                }
                if (t.fromGoalId && goal.id !== t.fromGoalId) {
                    // console.log('t', t);
                    const fromGoal = goals.find(g => g.id === t.fromGoalId);
                    return {
                        hash: null,
                        memo: `Moved from ${(fromGoal && fromGoal.name) || 'another goal'}`,
                        amount: t.amount,
                        date: t.date,
                        direction: 'in',
                    };
                }
                if (t.fromGoalId && goal.id === t.fromGoalId) {
                    // console.log('t', t);
                    const toGoal = goals.find(g => g.id === t.goalId);
                    return {
                        hash: null,
                        memo: `Moved to ${(toGoal && toGoal.name) || 'another goal'}`,
                        amount: t.amount,
                        date: t.date,
                        direction: 'out',
                    };
                }
                const entry = entries.find(e => e.hash === t.cloudHash);
                if (!entry) {
                    console.log('COULD NOT FIND ENTRY!!!', t);
                }
                // console.log('t', t);
                return {
                    hash: entry.hash,
                    memo: entry.memo,
                    amount: t.amount,
                    date: t.date,
                    direction: 'in',
                };
            })
            .reduce((arr, item) => {
                const prev = arr[arr.length - 1];
                if (prev && item.hash && item.hash === prev.hash && getDateDiff(prev.date, item.date) < 1) {
                    prev.amount = new BigNumber(prev.amount).plus(item.amount).toString(10);
                    return arr;
                }
                return arr.concat(item);
            }, []);

        dispatch({type: KIDS_UPDATE_GOAL_HISTORY, kid, goal, history});

        console.log('history', history);

        for (const item of history) {
            console.log('===>', item.memo, '(', item.amount, item.date, ')');
            // const duration = moment.duration(end.diff(startTime));
        }
    }
};
