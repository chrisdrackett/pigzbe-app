import BigNumber from 'bignumber.js';

export const getBalance = (account, assetCode) => {
    const asset = account.balances.find(b => b.asset_code === assetCode);
    return asset ? asset.balance : '0';
};

export const getMinBalance = account => {
    const subentryCount = account.subentry_count;
    const txFee = new BigNumber(100).times(0.0000001);
    const minBalance = new BigNumber(1 + subentryCount * 0.5).plus(txFee);
    return minBalance.toString();
};

export const getHasGas = account => {
    const balanceXLM = getBalance(account);
    const minXLM = getMinBalance(account);
    return new BigNumber(balanceXLM).greaterThanOrEqualTo(minXLM);
};

export const getAssetIssuer = (account, assetCode) => {
    const asset = account.balances.find(b => b.asset_code === assetCode);
    return asset && asset.asset_issuer || null;
};

export const getAssetTrusted = (account, asset) => {
    return account.balances.some(balance => {
        return balance.asset_code === asset.getCode() &&
               balance.asset_issuer === asset.getIssuer();
    });
};
