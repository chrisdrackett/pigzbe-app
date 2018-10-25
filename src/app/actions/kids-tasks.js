import {
    // createTasksAccount,
    appAddSuccessAlert, appAddWarningAlert} from './';
import {
    loadAccount,
    getData,
    // setData,
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
import Keychain from '../utils/keychain';
import {saveKids} from './';
import {MEMO_PREPEND_TASK} from 'app/constants';

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
        const destination = kid.address;

        console.log('send money to tasks account', destination);

        const asset = wolloAsset(getState());
        // memo needs to be a unique ref to task
        // const memo = task.slice(0, 28);
        const memo = `${MEMO_PREPEND_TASK}${task}`.slice(0, 28);
        const result = await sendPayment(secretKey, destination, reward, memo, asset);

        console.log('result', result);

        await dispatch(({type: KIDS_ASSIGN_TASK, data: {
            kid,
            task,
            reward,
            transaction: result.hash
        }}));

        await dispatch(saveKids());

        // dispatch(kidsLoading(false));
        dispatch(taskLoading(false));
        dispatch(appAddSuccessAlert('Added task'));
    } catch (error) {
        console.log(error);
        dispatch(taskLoading(false));
        dispatch(appAddWarningAlert('Failed to add task'));
    }
};

export const completeTask = (kidAddress, hash) => async (dispatch, getState) => {
    console.log('COMPLETE TASK', kidAddress, hash);
    const {kids} = getState().kids;

    const kid = kids.find(k => k.address === kidAddress);
    const task = kid.tasks.find(t => t.transaction === hash);

    if (!task) {
        console.log('Not a task!');
        return;
    }

    try {
        await dispatch(({type: KIDS_COMPLETE_TASK, data: {
            kid,
            task,
        }}));

        await dispatch(saveKids());

        // dispatch(appAddSuccessAlert('Completed task'));

        // setTimeout(() => dispatch(loadKidsBalances(kid.address)), 1000);
    } catch (error) {
        console.log(error);
        // dispatch(appAddWarningAlert('Completing task failed'));
    }
};

export const deleteTask = (kid, task) => async (dispatch, getState) => {
    try {
        dispatch(taskLoading(true));

        const transaction = await loadTransaction(task.transaction);
        const operations = await transaction.operations();
        const {amount, from, to} = operations.records[0];

        const tasksAccount = await loadAccount(to);
        const asset = wolloAsset(getState());
        const tx = new TransactionBuilder(tasksAccount)
            .addOperation(Operation.payment({
                destination: from,
                asset,
                amount: ensureValidAmount(amount)
            }))
            .addMemo(Memo.text(`Delete ${task.task}`))
            .build();

        const secretKey = await Keychain.load(`secret_${kid.address}`);
        const keypair = Keypair.fromSecret(secretKey);
        tx.sign(keypair);

        const result = getServer().submitTransaction(tx);
        console.log('result', result);

        dispatch(({type: KIDS_DELETE_TASK, data: {kid, task}}));

        await dispatch(saveKids());
        dispatch(taskLoading(false));
        return true;
    } catch (error) {
        console.log(error);
        dispatch(taskLoading(false));
        dispatch(appAddWarningAlert('Failed to delete task'));
        return false;
    }
};
