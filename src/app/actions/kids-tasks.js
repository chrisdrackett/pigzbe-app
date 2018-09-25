import {createTasksAccount, appAddSuccessAlert, appAddWarningAlert} from './';
import {
    loadAccount,
    getData,
    setData,
    sendPayment,
    TransactionBuilder,
    Operation,
    getServer,
    Memo,
    Keypair,
    loadTransaction
} from '@pigzbe/stellar-utils';
import {wolloAsset} from '../selectors';
import Keychain from '../utils/keychain';
import BigNumber from 'bignumber.js';
import {saveKids, updateKidBalance} from './';

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
        const account = await loadAccount(kid.address);
        let destination = getData(account, 'tasks');
        if (!destination) {
            console.log('create tasksAccount');
            destination = await dispatch(createTasksAccount(kid));
            console.log('destination', destination);
            const kidSecretKey = await Keychain.load(`secret_${kid.address}`);
            console.log('kidSecretKey', kidSecretKey);
            await setData(kidSecretKey, 'tasks', destination);
        }

        console.log('send money to tasks account', destination);

        const asset = wolloAsset(getState());
        // memo needs to be a unique ref to task
        const memo = task.slice(0, 28);
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
        dispatch(appAddWarningAlert('Add task failed'));
    }
};

export const completeTask = (kid, task) => async (dispatch, getState) => {
    console.log('COMPLETE TASK', kid.name, task.task, task.transaction);

    try {
        console.log('kid.address', kid.address);
        let kidAccount;
        try {
            kidAccount = await loadAccount(kid.address);
        } catch (e) {
            console.log(e);
        }
        console.log('kidAccount', kidAccount);
        const tasksPublicKey = getData(kidAccount, 'tasks');
        console.log('tasksPublicKey', tasksPublicKey);
        const tasksAccount = await loadAccount(tasksPublicKey);
        console.log('tasksAccount', tasksAccount);
        const asset = wolloAsset(getState());
        const tx = new TransactionBuilder(tasksAccount)
            .addOperation(Operation.payment({
                destination: kid.address,
                asset,
                amount: String(task.reward)
            }))
            .addMemo(Memo.text(task.task))
            .build();

        const kidSecretKey = await Keychain.load(`secret_${kid.address}`);
        console.log('kidSecretKey', kidSecretKey);
        const keypair = Keypair.fromSecret(kidSecretKey);
        tx.sign(keypair);

        const result = getServer().submitTransaction(tx);
        console.log('result', result);

        const balance = new BigNumber(kid.balance).plus(task.reward).toString(10);
        dispatch(updateKidBalance(kid.address, balance));

        await dispatch(({type: KIDS_COMPLETE_TASK, data: {
            kid,
            task,
        }}));

        await dispatch(saveKids());

        dispatch(appAddSuccessAlert('Completed task'));

        // setTimeout(() => dispatch(loadKidsBalances(kid.address)), 1000);
    } catch (error) {
        console.log(error);
        dispatch(appAddWarningAlert('Completing task failed'));
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
                amount
            }))
            .addMemo(Memo.text(`Delete ${task.task}`))
            .build();

        const {secretKey} = getState().keys;
        const keypair = Keypair.fromSecret(secretKey);
        tx.sign(keypair);

        const result = getServer().submitTransaction(tx);
        console.log('result', result);

        dispatch(({type: KIDS_DELETE_TASK, data: {kid, task}}));

        await dispatch(saveKids());
        dispatch(taskLoading(false));
    } catch (error) {
        console.log(error);
        dispatch(appAddWarningAlert('Delete task failed'));
    }
};
