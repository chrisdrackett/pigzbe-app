import BigNumber from 'bignumber.js';
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
import {saveKids, getWolloBalance, appAddSuccessAlert, appAddWarningAlert, getTreeHistory, loadSecretKey} from '.';
import {KIDS_GOAL_WOLLO_TRANSACTION} from './';

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
            balance: '0',
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

export const deleteGoal = (kid, goal) => async dispatch => {
    dispatch(goalLoading(true));
    try {
        // If there's any wollo assigned to this goal, move to the home tree
        if (goal.balance > 0) {
            const homeGoal = kid.goals[0];
            homeGoal.balance = new BigNumber(homeGoal.balance).plus(goal.balance).toString(10);
            dispatch({
                type: KIDS_UPDATE_GOAL,
                kid,
                goal: {...homeGoal},
            });
        }

        dispatch({type: KIDS_DELETE_GOAL, kid, goal});
        await dispatch(saveKids());

        dispatch(appAddSuccessAlert('Deleted goal'));

    } catch (err) {
        console.log(err);
        dispatch(appAddWarningAlert('Delete goal failed'));
    }
    dispatch(goalLoading(false));
};

export const moveGoalWollo = (kid, fromId, toId, amount) => async dispatch => {
    dispatch(goalLoading(true));
    try {

        const fromGoal = kid.goals.find(goal => goal.id === parseInt(fromId, 10));
        const toGoal = kid.goals.find(goal => goal.id === parseInt(toId, 10));

        if (fromGoal.balance < amount) {
            throw new Error('Not enough Wollo to move to different goal');
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

        dispatch({
            type: KIDS_GOAL_WOLLO_TRANSACTION,
            kid,
            amount: String(amount),
            goalId: toGoal.id,
            fromGoalId: fromGoal.id,
        });

        await dispatch(saveKids());

        dispatch(getTreeHistory(kid.address));

        dispatch(appAddSuccessAlert('Sucessfully sent Wollo'));

    } catch (err) {
        console.log(err);
        dispatch(appAddWarningAlert('Move Wollo failed'));
    }
    dispatch(goalLoading(false));
};

export const sendGoalWolloToParent = (kid, goal, amount) => async (dispatch, getState) => {
    dispatch(goalLoading(true));
    try {
        const asset = wolloAsset(getState());
        const {publicKey} = getState().keys;

        // Load kids secret key
        const secretKey = await dispatch(loadSecretKey(kid.address));
        const keypair = Keypair.fromSecret(secretKey);
        const account = await loadAccount(kid.address);

        if (goal.balance < amount) {
            throw new Error('Not enough Wollo to move to different goal');
        }

        const txb = new TransactionBuilder(account);
        txb.addOperation(Operation.payment({
            destination: publicKey,
            asset,
            amount: ensureValidAmount(amount),
        }));
        txb.addMemo(Memo.text('Sent Wollo to parent'));

        const tx = txb.build();
        tx.sign(keypair);

        await getServer().submitTransaction(tx);

        goal.balance = new BigNumber(goal.balance).minus(amount).toString(10);
        dispatch({
            type: KIDS_UPDATE_GOAL,
            kid,
            goal: {...goal},
        });

        dispatch({
            type: KIDS_GOAL_WOLLO_TRANSACTION,
            kid,
            amount: String(amount),
            fromGoalId: goal.id,
            toParent: true,
        });

        await dispatch(saveKids());

        dispatch(getTreeHistory(kid.address));

        dispatch(appAddSuccessAlert('Sucessfully sent Wollo'));

    } catch (err) {
        console.log(err);
        dispatch(appAddWarningAlert('Send Wollo failed'));
    }
    dispatch(goalLoading(false));
};

export const updateBalance = address => async dispatch => {
    const account = await loadAccount(address);
    const balance = getWolloBalance(account);
    dispatch({type: KIDS_SET_BALANCE, address, balance});
};
