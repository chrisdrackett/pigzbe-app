import {Asset, Keypair, Memo, Operation, TransactionBuilder} from './';
import {getServer} from './server';

export const paymentInfo = async (payment, publicKey) => {
    let {amount, from, to} = payment;
    let direction = from === publicKey ? 'out' : 'in';
    let address = from === publicKey ? payment.to : payment.from;

    const assetCode = payment.asset_code || 'XLM';
    const date = payment.created_at;
    const link = payment._links.self.href;

    if (payment.type === 'create_account') {
        from = payment.funder;
        to = payment.account;
        address = payment.funder;
        amount = payment.starting_balance;
        direction = 'in';
    }

    if (payment.type === 'account_merge') {
        direction = payment.account === publicKey ? 'out' : 'in';
        address = payment.account === publicKey ? payment.into : payment.account;
        amount = '[account merge]';
    }

    const transaction = await payment.transaction();

    const memo = transaction.memo_type === 'text' ? transaction.memo : '';

    return {
        date,
        amount,
        assetCode,
        direction,
        from,
        to,
        address,
        memo,
        link,
    };
};

export const paymentHistory = publicKey => {
    return getServer().payments()
        .forAccount(publicKey)
        .order('desc')
        .limit(100)
        .call()
        .then(payments => payments.records);
};

export const sendPayment = async (
    destination,
    secretKey,
    amount,
    memo = '',
    asset = Asset.native()
) => {

    const keypair = Keypair.fromSecret(secretKey);

    const account = await getServer().loadAccount(keypair.publicKey());

    const transaction = new TransactionBuilder(account)
        .addOperation(Operation.payment({
            destination,
            asset,
            amount
        }))
        .addMemo(Memo.text(memo))
        .build();

    transaction.sign(keypair);

    return getServer().submitTransaction(transaction);
};

export const getAsset = (code, issuer) => new Asset(code, issuer);
