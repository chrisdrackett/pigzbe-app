import {
    loadAccount,
    sendPayment,
    trustAsset,
    createAccount,
    TransactionBuilder,
    Keypair,
    paymentHistoryAll,
    Operation,
    getServer
} from '@pigzbe/stellar-utils';
import {wolloAsset} from '../selectors';
import {getSeedHex, findSecretKey, getKeypair} from '../utils/hd-wallet';
import {getWolloBalance} from './';
import {KEYCHAIN_ID_MNEMONIC} from 'app/constants';
import Keychain from 'app/utils/keychain';

// main net
const distributionKey = 'GBS36EHZKG4H4ZEI6O5CZT33VFR23K6HTMMIU6MZXGLG5Q4NV7M4BDFP';

export const mergeAccount = (publicKey, secretKey) => async (dispatch, getState) => {
    console.log('Merge Account', publicKey);
    try {
        let account = null;

        try {
            account = await loadAccount(publicKey);
        } catch (e) {
            console.log('Account not found');
            return;
        }

        const wloAmount = getWolloBalance(account);
        const asset = wolloAsset(getState());

        if (Number(wloAmount) > 0) {
            await sendPayment(secretKey, distributionKey, wloAmount, null, asset);
        }

        const txb = new TransactionBuilder(account);
        txb.addOperation(Operation.changeTrust({
            asset,
            limit: '0'
        }));
        txb.addOperation(Operation.accountMerge({
            destination: distributionKey
        }));
        const tx = txb.build();
        const keypair = Keypair.fromSecret(secretKey);
        tx.sign(keypair);

        await getServer().submitTransaction(tx);
    } catch (e) {
        console.log(e);
    }
};

export const mergeAccounts = () => async dispatch => {
    try {
        const mnemonic = await Keychain.load(KEYCHAIN_ID_MNEMONIC);
        const seedHex = getSeedHex(mnemonic);
        const keypair = getKeypair(seedHex, 0);

        const payments = await paymentHistoryAll(keypair.publicKey());

        const accountsCreated = payments.filter(p => p.type === 'create_account' && p.funder === keypair.publicKey());

        for (const payment of accountsCreated) {
            const address = payment.account;
            const {secretKey} = findSecretKey(address, seedHex, 1);
            await dispatch(mergeAccount(address, secretKey));
        }

        await dispatch(mergeAccount(keypair.publicKey(), keypair.secret()));
    } catch (e) {
        console.log(e);
    }
};

// test net
export const fundAccount = (xlm = '100', wollo = '500') => async (dispatch, getState) => {
    const {publicKey, secretKey} = getState().keys;
    const asset = wolloAsset(getState());
    const funderSecretKey = 'SBJZSBTMIKWYZ3NLK7ZM5OWGLFE33YWLWZBMKI6GXRLHVQ2VTLS2NGPH';
    try {
        console.log('Trying to send XLM', publicKey);
        await sendPayment(funderSecretKey, publicKey, xlm, 'Fund XLM');
    } catch (error) {
        console.log('Creating account with XLM', publicKey);
        try {
            await createAccount(funderSecretKey, publicKey, xlm, 'Fund XLM');
        } catch (err) {
            console.log(err);
        }
    }
    try {
        await trustAsset(secretKey, asset);
        await sendPayment(funderSecretKey, publicKey, wollo, 'Fund WLO', asset);
    } catch (error) {
        console.log(error);
    }
};
