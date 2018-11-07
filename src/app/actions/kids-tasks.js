import {appAddSuccessAlert, appAddWarningAlert} from './';
import {
    loadAccount,
    sendPayment,
    TransactionBuilder,
    Operation,
    getServer,
    Memo,
    Keypair,
    loadTransaction,
    ensureValidAmount
} from '@pigzbe/stellar-utils';
import {wolloAsset} from '../selectors';
import {saveKids, refreshBalance, loadSecretKey} from './';
import {MEMO_PREPEND_TASK} from 'app/constants';
import formatMemo from 'app/utils/format-memo';

export const KIDS_LOADING_TASK = 'KIDS_LOADING_TASK';
export const KIDS_ASSIGN_TASK = 'KIDS_ASSIGN_TASK';
export const KIDS_COMPLETE_TASK = 'KIDS_COMPLETE_TASK';
export const KIDS_DELETE_TASK = 'KIDS_DELETE_TASK';

const taskLoading = value => ({type: KIDS_LOADING_TASK, value});

export const assignTask = (kid, task, reward) => async (dispatch, getState) => {
    try {
        console.log('kid', kid, 'task', task, 'reward', reward);
        const {secretKey} = getState().keys;
        // dispatch(kidsLoading(true));
        dispatch(taskLoading(true));

        console.log('assignTask', kid.address);

        const asset = wolloAsset(getState());
        const amount = ensureValidAmount(reward);
        const memo = formatMemo(`${MEMO_PREPEND_TASK}${task}`);
        const result = await sendPayment(secretKey, kid.address, amount, memo, asset);

        console.log('assignTask result', result.hash);

        await dispatch(({type: KIDS_ASSIGN_TASK, data: {
            kid,
            name: memo.slice(MEMO_PREPEND_TASK.length),
            amount,
            hash: result.hash,
            partialClaim: false,
        }}));

        await dispatch(saveKids());

        dispatch(taskLoading(false));
        dispatch(appAddSuccessAlert('Added task'));

        dispatch(refreshBalance(kid.address));
    } catch (error) {
        console.log(error);
        dispatch(taskLoading(false));
        dispatch(appAddWarningAlert('Failed to add task'));
    }
};

export const deleteTask = (kid, task) => async (dispatch, getState) => {
    try {
        dispatch(taskLoading(true));

        if (task.partialClaim) {
            dispatch(taskLoading(false));
            dispatch(appAddWarningAlert('Task has been partially claimed'));
            return false;
        }

        console.log('task.hash', task.hash);

        const transaction = await loadTransaction(task.hash);
        console.log('transaction', transaction);
        const operations = await transaction.operations();
        console.log('operations', operations);
        const {amount, from, to} = operations.records[0];

        console.log('deleteTask', amount, from, to);

        const tasksAccount = await loadAccount(to);
        const asset = wolloAsset(getState());
        const tx = new TransactionBuilder(tasksAccount)
            .addOperation(Operation.payment({
                destination: from,
                asset,
                amount: ensureValidAmount(amount)
            }))
            .addMemo(Memo.hash(task.hash))
            .build();

        const secretKey = await dispatch(loadSecretKey(kid.address));
        const keypair = Keypair.fromSecret(secretKey);
        tx.sign(keypair);

        const result = await getServer().submitTransaction(tx);

        dispatch(({type: KIDS_DELETE_TASK, address: kid.address, hash: task.hash}));

        await dispatch(saveKids());
        dispatch(taskLoading(false));
        dispatch(refreshBalance(kid.address));
        return true;
    } catch (error) {
        console.log(error);
        dispatch(taskLoading(false));
        dispatch(appAddWarningAlert('Failed to delete task'));
        return false;
    }
};
