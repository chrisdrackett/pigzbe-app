import {paymentHistoryAll, loadAccount} from '@pigzbe/stellar-utils';
import {MEMO_PREPEND_ADD, MEMO_PREPEND_HOME, MEMO_PREPEND_GOAL} from '../constants';
import {getSeedHex, getKeypair, isValidMnemonic, findSecretKey} from '../utils/hd-wallet';
import {appError, restoreKid, loadKidsBalances, setKeys, saveKeys, settingsFirstTime, settingsUpdate} from './';

export const KEYS_RESTORE_LOADING = 'KEYS_RESTORE_LOADING';
export const KEYS_RESTORE_ERROR = 'KEYS_RESTORE_ERROR';

export const restoreKeysError = error => ({type: KEYS_RESTORE_ERROR, error});

export const restoreKeysLoading = value => ({type: KEYS_RESTORE_LOADING, value});

export const restoreKeys = mnemonic => async dispatch => {
    dispatch(restoreKeysError(null));
    dispatch(appError(null));
    dispatch(restoreKeysLoading(true));

    try {
        if (!isValidMnemonic(mnemonic)) {
            throw new Error('Invalid mnemonic');
        }
        const seedHex = getSeedHex(mnemonic);
        const keypair = getKeypair(seedHex, 0);
        const publicKey = keypair.publicKey();

        const payments = await paymentHistoryAll(publicKey);

        const accountsCreated = payments.filter(p => p.type === 'create_account' && p.funder === publicKey);

        const accountsFound = [];

        for (const payment of accountsCreated) {
            const address = payment.account;
            const transaction = await payment.transaction();
            const memo = transaction.memo_type === 'text' ? transaction.memo : '';
            const {secretKey, index} = findSecretKey(address, seedHex, 1);

            accountsFound.push({
                address,
                memo,
                secretKey,
                index,
            });
        }

        const sortedAccounts = accountsFound.sort((a, b) => a.index - b.index);

        const mainAccounts = sortedAccounts.filter(a => a.memo.indexOf(MEMO_PREPEND_ADD) === 0);

        const homeAccounts = sortedAccounts.filter(a => a.memo.indexOf(MEMO_PREPEND_HOME) === 0);
        const goalAccounts = sortedAccounts.filter(a => a.memo.indexOf(MEMO_PREPEND_GOAL) === 0);

        const kidHomeAccounts = [];

        for (const homeAccount of homeAccounts) {
            const account = await loadAccount(homeAccount.address);
            // console.log('home account', account);
            kidHomeAccounts.push({
                ...homeAccount,
                account
            });
        }

        const kidGoalAccounts = [];

        for (const goalAccount of goalAccounts) {
            const account = await loadAccount(goalAccount.address);
            // console.log('goal account', account);
            kidGoalAccounts.push({
                ...goalAccount,
                account
            });
        }

        const kidAccounts = [];

        for (const mainAccount of mainAccounts) {
            const {address, memo} = mainAccount;
            const home = kidHomeAccounts.find(h => h.account.signers.find(s => s.key === address));
            // console.log('====> home', home);
            const goals = kidGoalAccounts
                .filter(g => g.account.signers.find(s => s.key === address))
                .map(g => ({
                    name: g.memo.slice(MEMO_PREPEND_GOAL.length),
                    address: g.address,
                    reward: '100'
                }));
            // console.log('====> goals: ', goals);
            if (home) {
                kidAccounts.push({
                    name: memo.slice(MEMO_PREPEND_ADD.length),
                    address,
                    home: home.address,
                    goals
                });
            }
        }

        for (const k of kidAccounts) {
            console.log('Found', k.name, k.address, k.home, k.goals);
            dispatch(restoreKid(k.name, k.address, k.home, k.goals));
        }
        const keyIndex = accountsFound.slice(-1).pop().index;
        console.log('keyIndex', keyIndex);
        dispatch(setKeys(keypair, mnemonic, true));
        await dispatch(settingsUpdate({keyIndex}));
        await dispatch(saveKeys());
        dispatch(settingsFirstTime());
        dispatch(loadKidsBalances());
    } catch (error) {
        console.log(error);
        const err = new Error('Could not recover account. Please check your mnemonic and ensure you are trying to recover and account that was previously funded.');
        dispatch(restoreKeysError(err));
        dispatch(appError(err));
    }
    dispatch(restoreKeysLoading(false));
};
