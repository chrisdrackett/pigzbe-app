import BigNumber from 'bignumber.js';

export default (amount = 0, dp = 2, minDp = 2) => {
    if (typeof amount === 'number') {
        amount = amount.toFixed(7);
    } else if (typeof amount === 'string') {
        amount = amount.replace(/[^0-9.]/g, '');
    }
    const num = new BigNumber(amount);
    const dps = Math.min(Math.max(num.dp(), minDp), dp);
    const formatted = num.toFormat(dps, BigNumber.ROUND_DOWN);
    return formatted;
};
