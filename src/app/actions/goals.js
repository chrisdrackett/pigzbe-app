import {createGoalAccount} from '.';
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
import {saveKids, getWolloBalance, appAddSuccessAlert, appAddWarningAlert} from '.';

export const KIDS_LOADING_GOAL = 'KIDS_LOADING_GOAL';
export const KIDS_ASSIGN_GOAL = 'KIDS_ASSIGN_GOAL';
export const KIDS_UPDATE_GOAL = 'KIDS_UPDATE_GOAL';
export const KIDS_DELETE_GOAL = 'KIDS_DELETE_GOAL';
export const KIDS_SET_BALANCE = 'KIDS_SET_BALANCE';

const goalLoading = value => ({type: KIDS_LOADING_GOAL, value});

export const assignGoal = (kid, goalName, reward) => async (dispatch, getState) => {
    try {
        dispatch(goalLoading(true));

        const destination = await dispatch(createGoalAccount(kid, goalName));

        if (!destination) {
            throw new Error('Could not create goal');
        }

        console.log('assignGoal destination', destination);

        await dispatch(({type: KIDS_ASSIGN_GOAL, kid, goal: {
            address: destination,
            name: goalName,
            reward,
        }}));

        await dispatch(saveKids());

        dispatch(goalLoading(false));

        dispatch(appAddSuccessAlert('Added goal'));

    } catch (err) {
        console.log(err);
        dispatch(appAddWarningAlert('Failed to add goal'));

        dispatch(goalLoading(false));
    }
};

export const updateGoal = (kid, goalName, reward, goalAddress) => async (dispatch, getState) => {
    try {
        dispatch(goalLoading(true));

        await dispatch(({type: KIDS_UPDATE_GOAL, kid, goal: {
            address: goalAddress,
            name: goalName,
            reward,
        }}));

        await dispatch(saveKids());

        dispatch(goalLoading(false));

        dispatch(appAddSuccessAlert('Updated goal'));
    } catch (err) {
        console.log('ERROR');
        console.log(err);
        dispatch(appAddWarningAlert('Update goal failed'));
    }
};

export const deleteGoal = (kid, goal) => async (dispatch, getState) => {
    try {
        dispatch(goalLoading(true));

        const asset = wolloAsset(getState());
        const parentAddress = getState().keys.publicKey;
        const goalAccount = await loadAccount(goal.address);
        const wolloBalance = getWolloBalance(goalAccount);

        const txb = new TransactionBuilder(goalAccount);
        if (wolloBalance > 0) {
            txb.addOperation(Operation.payment({
                destination: kid.address,
                asset,
                amount: String(wolloBalance),
            }));
        }
        txb.addOperation(Operation.changeTrust({
            asset,
            limit: '0',
        }));
        txb.addOperation(Operation.accountMerge({
            destination: parentAddress,
        }));
        txb.addMemo(Memo.text(`Delete ${goal.name}`));

        const tx = txb.build();

        const {secretKey} = getState().keys;
        const keypair = Keypair.fromSecret(secretKey);
        tx.sign(keypair);

        await getServer().submitTransaction(tx);

        dispatch({type: KIDS_DELETE_GOAL, kid, goal});

        await dispatch(saveKids());
        dispatch(goalLoading(false));


        dispatch(appAddSuccessAlert('Deleted goal'));

    } catch (err) {
        console.log(err);
        dispatch(appAddWarningAlert('Delete goal failed'));
    }
};

export const moveGoalWollo = (fromAddress, destinationAddress, amount) => async (dispatch, getState) => {
    try {
        dispatch(goalLoading(true));

        const asset = wolloAsset(getState());

        // Load the GOAL (or home tree) secret key
        const secretKey = await Keychain.load(`secret_${fromAddress}`);
        const keypair = Keypair.fromSecret(secretKey);

        const goalAccount = await loadAccount(fromAddress);
        const wolloBalance = getWolloBalance(goalAccount);

        if (wolloBalance < amount) {
            throw new Error('Not enough wollo to move to different goal');
        }

        const txb = new TransactionBuilder(goalAccount);
        txb.addOperation(Operation.payment({
            destination: destinationAddress,
            asset,
            amount: String(amount),
        }));
        txb.addMemo(Memo.text('Moved wollo to other goal'));

        const tx = txb.build();
        tx.sign(keypair);

        await getServer().submitTransaction(tx);

        dispatch(goalLoading(false));

        dispatch(appAddSuccessAlert('Sucessfully sent wollo'));

        dispatch(updateBalance(fromAddress));
        dispatch(updateBalance(destinationAddress));

    } catch (err) {
        console.log(err);
        dispatch(appAddWarningAlert('Move wollo failed'));
        dispatch(goalLoading(false));
    }
};

export const sendGoalWolloToParent = (goalAddress, amount) => async (dispatch, getState) => {
    try {
        dispatch(goalLoading(true));

        const asset = wolloAsset(getState());
        const {publicKey} = getState().keys;

        // Load the GOAL (or home tree) secret key
        const secretKey = await Keychain.load(`secret_${goalAddress}`);
        const keypair = Keypair.fromSecret(secretKey);

        const goalAccount = await loadAccount(goalAddress);
        const wolloBalance = getWolloBalance(goalAccount);
        if (wolloBalance < amount) {
            throw new Error('Not enough wollo to move to different goal');
        }

        const txb = new TransactionBuilder(goalAccount);
        txb.addOperation(Operation.payment({
            destination: publicKey,
            asset,
            amount: String(amount),
        }));
        txb.addMemo(Memo.text('Sent wollo to parent'));

        const tx = txb.build();
        tx.sign(keypair);

        await getServer().submitTransaction(tx);

        dispatch(goalLoading(false));

        dispatch(updateBalance(goalAddress));

        dispatch(appAddSuccessAlert('Sucessfully sent wollo'));

    } catch (err) {
        console.log(err);
        dispatch(appAddWarningAlert('Send wollo failed'));
        dispatch(goalLoading(false));
    }
};

export const updateBalance = address => async dispatch => {
    const account = await loadAccount(address);
    const balance = getWolloBalance(account);
    dispatch({type: KIDS_SET_BALANCE, address, balance});
};
