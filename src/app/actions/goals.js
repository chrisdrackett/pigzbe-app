import BigNumber from 'bignumber.js';
import {createGoalAccount} from '.';
import {
    loadAccount,
    TransactionBuilder,
    Operation,
    getServer,
    Memo,
    Keypair,
    ensureValidAmount
} from '@pigzbe/stellar-utils';
import {wolloAsset} from '../selectors';
import Keychain from '../utils/keychain';
import {saveKids, getWolloBalance, appAddSuccessAlert, appAddWarningAlert} from '.';

export const KIDS_LOADING_GOAL = 'KIDS_LOADING_GOAL';
export const KIDS_ASSIGN_GOAL = 'KIDS_ASSIGN_GOAL';
export const KIDS_UPDATE_GOAL = 'KIDS_UPDATE_GOAL';
export const KIDS_DELETE_GOAL = 'KIDS_DELETE_GOAL';
export const KIDS_SET_BALANCE = 'KIDS_SET_BALANCE';

const goalLoading = value => ({type: KIDS_LOADING_GOAL, value});

export const assignGoal = (kid, goalName, reward) => async dispatch => {
    dispatch(goalLoading(true));
    try {
        const id = kid.goals[kid.goals.length - 1].id + 1;
        await dispatch(({type: KIDS_ASSIGN_GOAL, kid, goal: {
            id,
            name: goalName,
            balance: "0",
            reward,
        }}));

        await dispatch(saveKids());
        dispatch(appAddSuccessAlert('Added goal'));
    } catch (err) {
        console.log(err);
        dispatch(appAddWarningAlert('Failed to add goal'));
    }
    dispatch(goalLoading(false));
};

export const updateGoal = (kid, goalName, reward, goalId) => async dispatch => {
    dispatch(goalLoading(true));
    try {
        await dispatch(({type: KIDS_UPDATE_GOAL, kid, goal: {
            id: goalId,
            name: goalName,
            reward,
        }}));

        await dispatch(saveKids());

        dispatch(appAddSuccessAlert('Updated goal'));
    } catch (err) {
        console.log('ERROR');
        console.log(err);
        dispatch(appAddWarningAlert('Update goal failed'));
    }
    dispatch(goalLoading(false));
};

export const deleteGoal = (kid, goal) => async (dispatch, getState) => {
    dispatch(goalLoading(true));
    try {
        // @todo re-distribute any wollo in this goal (goal.balance) to other trees.

        dispatch({type: KIDS_DELETE_GOAL, kid, goal});
        await dispatch(saveKids());

        dispatch(appAddSuccessAlert('Deleted goal'));

    } catch (err) {
        console.log(err);
        dispatch(appAddWarningAlert('Delete goal failed'));
    }
    dispatch(goalLoading(false));
};

export const moveGoalWollo = (kid, fromId, toId, amount) => async (dispatch, getState) => {
    dispatch(goalLoading(true));
    try {

        const asset = wolloAsset(getState());

        const fromGoal = kid.goals.find(goal => goal.id === parseInt(fromId));
        const toGoal = kid.goals.find(goal => goal.id === parseInt(toId));

        if (fromGoal.balance < amount) {
            throw new Error('Not enough wollo to move to different goal');
        }
 
        fromGoal.balance = new BigNumber(fromGoal.balance).minus(amount).toString(10);
        toGoal.balance = new BigNumber(toGoal.balance).plus(amount).toString(10);

        dispatch({
            type: KIDS_UPDATE_GOAL,
            kid,
            goal: {...fromGoal},
        });

        dispatch({
            type: KIDS_UPDATE_GOAL,
            kid,
            goal: {...toGoal},
        });

        await dispatch(saveKids());

        dispatch(appAddSuccessAlert('Sucessfully sent wollo'));

    } catch (err) {
        console.log(err);
        dispatch(appAddWarningAlert('Move wollo failed'));
    }
    dispatch(goalLoading(false));
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
            amount: ensureValidAmount(amount),
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
