import Keychain from '../utils/keychain';
import BigNumber from 'bignumber.js';
import {
    loadAccount,
    getServer,
    Keypair,
    TransactionBuilder,
    Operation,
    Memo,
    ensureValidAmount
} from '@pigzbe/stellar-utils';
import {
    getWolloBalance,
    updateBalance,
    kidsLoading,
    loadKidActions,
} from './';
import {wolloAsset} from '../selectors';

export const KIDS_COMPLETE_ACTION = 'KIDS_COMPLETE_ACTION';

export const claimWollo = (address, transfers) => async (dispatch, getState) => {
    console.log('claimWollo');

    // TODO: before send check if already claimed!

    try {
        dispatch(kidsLoading(true));

        const {actions} = getState().kids.kids.find(k => k.address === address);

        const mergedTransfers = Object.values(transfers.reduce((ob, t) => {
            const {destination, hash, amount} = t;
            const key = `${destination}${hash}`;
            if (ob[key]) {
                ob[key].amount = new BigNumber(ob[key].amount).plus(new BigNumber(amount)).toString(10);
            } else {
                ob[key] = {...t};
            }

            return ob;
        }, {}));

        const sanitisedTransfers = mergedTransfers.map(transfer => {
            const action = actions.find(a => a.hash === transfer.hash);
            return {
                ...transfer,
                amount: BigNumber.min(action.amount, transfer.amount).toString(10)
            };
        });

        const actionsComplete = actions.reduce((arr, action) => {
            const actionTransfers = sanitisedTransfers.filter(t => t.hash === action.hash);
            if (actionTransfers.length) {
                const totalAmount = actionTransfers.reduce((sum, transfer) => sum.plus(transfer.amount), new BigNumber(0));
                console.log('totalAmount', totalAmount.toString(10));
                const complete = totalAmount.isEqualTo(action.amount);
                console.log('complete', complete);
                if (complete) {
                    console.log('-->', action.memo, 'is complete');
                    return arr.concat({...action});
                }
            }
            return arr;
        }, []);

        console.log('transfers', transfers);
        console.log('mergedTransfers', mergedTransfers);
        console.log('sanitisedTransfers', sanitisedTransfers);
        console.log('actionsComplete', actionsComplete);

        for (const action of actionsComplete) {
            const {hash} = action;
            dispatch({type: KIDS_COMPLETE_ACTION, address, hash});
        }

        const kidSecretKey = await Keychain.load(`secret_${address}`);
        console.log('kidSecretKey', kidSecretKey);
        const keypair = Keypair.fromSecret(kidSecretKey);

        const account = await loadAccount(address);
        console.log('account', account);
        console.log('available balance', getWolloBalance(account));
        const asset = wolloAsset(getState());

        for (const transfer of sanitisedTransfers) {
            const {destination, amount, hash} = transfer;
            console.log('destination, amount', destination, amount);
            const txb = new TransactionBuilder(account);
            txb.addOperation(Operation.payment({
                destination,
                asset,
                amount: ensureValidAmount(amount)
            }));
            txb.addMemo(Memo.hash(hash));
            const tx = txb.build();
            tx.sign(keypair);
            const result = await getServer().submitTransaction(tx);
            console.log('result', result);
        }

        // refresh just the goals that have been changed
        for (const transfer of sanitisedTransfers) {
            await dispatch(updateBalance(transfer.destination));
        }

        setTimeout(() => dispatch(loadKidActions(address)), 1000);

    } catch (e) {
        console.log(e);
    }

    dispatch(kidsLoading(false));
};
