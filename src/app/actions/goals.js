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
import {saveKids, getWolloBalance} from '.';

export const KIDS_LOADING_GOAL = 'KIDS_LOADING_GOAL';
export const KIDS_ASSIGN_GOAL = 'KIDS_ASSIGN_GOAL';
export const KIDS_DELETE_GOAL = 'KIDS_DELETE_GOAL';

const goalLoading = value => ({type: KIDS_LOADING_GOAL, value});

export const assignGoal = (kid, goalName, reward) => async (dispatch, getState) => {
    dispatch(goalLoading(true));

    const destination = await dispatch(createGoalAccount(kid, goalName));

    await dispatch(({type: KIDS_ASSIGN_GOAL, kid, goal: {
        address: destination,
        name: goalName,
        reward,
    }}));

    await dispatch(saveKids());

    dispatch(goalLoading(false));
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
            }))
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
    
        const result = getServer().submitTransaction(tx);
    
        dispatch({type: KIDS_DELETE_GOAL, kid, goal});
    
        await dispatch(saveKids());
        dispatch(goalLoading(false));
    } catch (err) {
        console.log("ERROR");
        console.log(err);
    }
}
