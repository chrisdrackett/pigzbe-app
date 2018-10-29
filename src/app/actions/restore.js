import {paymentHistoryAll} from '@pigzbe/stellar-utils';
import {MEMO_PREPEND_CREATE} from '../constants';
import {getSeedHex, getKeypair, isValidMnemonic, findSecretKey} from '../utils/hd-wallet';
import {appError, restoreKid, setKeys, saveKeys, settingsFirstTime, settingsUpdate} from './';

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

        const kidAccounts = sortedAccounts
            .filter(a => a.memo.indexOf(MEMO_PREPEND_CREATE) === 0)
            .map(a => ({
                name: a.memo.slice(MEMO_PREPEND_CREATE.length),
                address: a.address
            }));

        for (const k of kidAccounts) {
            console.log('Found', k.name, k.address, k.home, k.goals);
            dispatch(restoreKid(k.name, k.address));
        }

        const keyIndex = accountsFound.slice(-1).pop().index;
        console.log('keyIndex', keyIndex);
        dispatch(setKeys(keypair, mnemonic, true));
        await dispatch(settingsUpdate({keyIndex}));
        await dispatch(saveKeys());
        dispatch(settingsFirstTime());
    } catch (error) {
        console.log(error);
        const err = new Error('Could not recover account. Please check your mnemonic and ensure you are trying to recover and account that was previously funded.');
        dispatch(restoreKeysError(err));
        dispatch(appError(err));
    }
    dispatch(restoreKeysLoading(false));
};
