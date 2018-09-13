import Storage from '../utils/storage';
import {STORAGE_KEY_FAMILY} from '../constants';
import {createKidAccount, createTasksAccount, getAccountBalance, sendWollo} from './';
import {
    loadAccount,
    getData,
    setData,
    sendPayment,
    TransactionBuilder,
    Operation,
    getServer,
    Memo,
    Keypair
} from '@pigzbe/stellar-utils';
import {wolloAsset} from '../selectors';
import Keychain from '../utils/keychain';

export const FAMILY_LOAD = 'FAMILY_LOAD';
export const FAMILY_LOADING = 'FAMILY_LOADING';
export const FAMILY_PARENT_NICKNAME = 'FAMILY_PARENT_NICKNAME';
export const FAMILY_NUM_KIDS_TO_ADD = 'FAMILY_NUM_KIDS_TO_ADD';
export const FAMILY_ADD_KID = 'FAMILY_ADD_KID';
export const FAMILY_ASSIGN_TASK = 'FAMILY_ASSIGN_TASK';
export const FAMILY_SENDING = 'FAMILY_SENDING';
export const FAMILY_BALANCE_UPDATE = 'FAMILY_BALANCE_UPDATE';
export const FAMILY_COMPLETE_TASK = 'FAMILY_COMPLETE_TASK';

const familyLoading = value => ({type: FAMILY_LOADING, value});

const familySending = value => ({type: FAMILY_SENDING, value});

export const loadFamily = () => async dispatch => {
    console.log('loadFamily');
    try {
        const data = await Storage.load(STORAGE_KEY_FAMILY);
        // console.log('data', data);
        // console.log(JSON.stringify(data, null, 2));
        dispatch({type: FAMILY_LOAD, ...data});
    } catch (error) {
        console.log(error);
    }
};

export const saveFamily = () => async (dispatch, getState) => {
    console.log('saveFamily');
    try {
        const data = getState().family;
        console.log('data', data);
        await Storage.save(STORAGE_KEY_FAMILY, data);
    } catch (error) {
        console.log(error);
    }
};

export const familyParentNickname = parentNickname => ({type: FAMILY_PARENT_NICKNAME, parentNickname});

export const familyNumKidsToAdd = numKidsToAdd => ({type: FAMILY_NUM_KIDS_TO_ADD, numKidsToAdd});

export const familyAddKid = (name, dob, photo) => async dispatch => {
    console.log('FAMILY_ADD_KID', name, dob, photo);
    dispatch(familyLoading(true));

    const address = await dispatch(createKidAccount(name));
    console.log('address', address);

    dispatch(({type: FAMILY_ADD_KID, kid: {name, dob, photo, address, balance: '0'}}));
    await dispatch(saveFamily());
    dispatch(familyLoading(false));
};

export const familyAssignTask = (kid, task, reward) => async (dispatch, getState) => {
    const {secretKey} = getState().wollo;
    dispatch(familyLoading(true));

    console.log('familyGetTasksAccount', kid.address);
    const account = await loadAccount(kid.address);
    let destination = getData(account, 'tasks');
    if (!destination) {
        console.log('create tasksAccount');
        destination = await dispatch(createTasksAccount(kid));
        console.log('destination', destination);
        const kidSecretKey = await Keychain.load(`secret_${kid.address}`);
        console.log('kidSecretKey', kidSecretKey);
        await setData(kidSecretKey.key, 'tasks', destination);
    }

    console.log('send money to tasks account', destination);

    const asset = wolloAsset(getState());
    // memo needs to be a unique ref to task
    const memo = task.slice(0, 28);
    const result = await sendPayment(secretKey, destination, reward, memo, asset);

    console.log('result', result);

    await dispatch(({type: FAMILY_ASSIGN_TASK, data: {
        kid,
        task,
        reward,
        transaction: result.hash
    }}));

    await dispatch(saveFamily());

    dispatch(familyLoading(false));
};

export const familyCompleteTask = (kid, task) => async (dispatch, getState) => {
    console.log('COMPLETE TASK', kid.name, task.task, task.transaction);

    try {
        // console.log('familyGetTasksAccount', publicKey);
        console.log('kid.address', kid.address);
        let kidAccount;
        try {
            kidAccount = await loadAccount(kid.address);

        } catch (e) {
            console.log(e);
        }
        // console.log('parentAccount', publicKey);
        console.log('kidAccount', kidAccount);
        // const parentAddress = kidAccount.signers.filter(s => s.key !== kid.address).pop().key;
        // console.log('parentAddress', parentAddress);

        // const account = await loadAccount(parentAddress);
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
        console.log('kidSecretKey', kidSecretKey.key);
        const keypair = Keypair.fromSecret(kidSecretKey.key);
        tx.sign(keypair);

        const result = getServer().submitTransaction(tx);
        console.log('result', result);

        // use kid secret to get cash
        // task.transaction
        // const asset = wolloAsset(getState());
        // await sendPayment(secretKey, kid.address, task.reward, task.task, asset);
        // TODO: how does this sync?
        await dispatch(({type: FAMILY_COMPLETE_TASK, data: {
            kid,
            task,
        }}));

        await dispatch(loadFamilyBalances(kid.address));

        await dispatch(saveFamily());
    } catch (error) {
        console.log(error);
    }
};

export const familyTransfer = (address, amount) => async (dispatch, getState) => {
    dispatch(familySending(true));
    try {
        const {parentNickname} = getState().family;
        await dispatch(sendWollo(address, amount, `From ${parentNickname || 'Parent'}`));
    } catch (error) {
        console.log(error);
    }
    dispatch(familySending(false));
};

export const loadFamilyBalances = address => async (dispatch, getState) => {
    try {
        const kids = getState().family.kids.filter(k => !address || k.address === address);
        for (const kid of kids) {
            const balance = await dispatch(getAccountBalance(kid.address));
            console.log(kid.name, 'balance', balance);
            dispatch(({type: FAMILY_BALANCE_UPDATE, address: kid.address, balance}));
        }
    } catch (error) {
        console.log(error);
    }
};
