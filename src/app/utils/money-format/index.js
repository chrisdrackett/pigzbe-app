import BigNumber from 'bignumber.js';

export default (amount, dp = 2, minDp = 2) => {
    if (typeof amount === 'number') {
        amount = amount.toFixed(7);
    }
    const num = new BigNumber(amount);
    const dps = Math.min(Math.max(num.dp(), minDp), dp);
    const formatted = num.toFormat(dps, BigNumber.ROUND_DOWN);
    return formatted;
};
