import {paymentHistoryAll, loadAccount} from '@pigzbe/stellar-utils';
import {MEMO_PREPEND_CREATE} from '../constants';
import {getSeedHex, getKeypair, isValidMnemonic, findSecretKey} from '../utils/hd-wallet';
import {
    appError,
    restoreKid,
    setKeys,
    saveKeys,
    settingsFirstTime,
    settingsUpdate,
    saveSecretKey,
    getWolloBalance,
    loadKidsActions,
    setParentNickname
} from './';

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
            .map(a => {
                const trimmedMemo = a.memo.slice(MEMO_PREPEND_CREATE.length);
                const [name, parentNickname] = trimmedMemo.split('~');
                console.log('name, parentNickname', name, parentNickname);
                return {
                    ...a,
                    name,
                    parentNickname
                };
            });

        for (const k of kidAccounts) {
            try {
                console.log('Found', k.name, k.address, k.secretKey);
                const account = await loadAccount(k.address);
                if (account) {
                    const balance = getWolloBalance(account);
                    await dispatch(saveSecretKey(k.address, k.secretKey));
                    if (k.parentNickname) {
                        dispatch(setParentNickname(k.parentNickname));
                    }
                    dispatch(restoreKid(k.name, k.address, balance));
                }
            } catch (e) {
                console.log('Could not restore', k.name);
            }
        }

        const keyIndex = accountsFound.slice(-1).pop().index;
        console.log('keyIndex', keyIndex);
        dispatch(setKeys(keypair, mnemonic, false));
        await dispatch(settingsUpdate({keyIndex}));
        await dispatch(loadKidsActions());
        dispatch(settingsFirstTime());
        await dispatch(saveKeys());
    } catch (error) {
        console.log(error);
        const err = new Error('Could not recover account. Please check your mnemonic and ensure you are trying to recover and account that was previously funded.');
        dispatch(restoreKeysError(err));
        dispatch(appError(err));
    }
    dispatch(restoreKeysLoading(false));
};
