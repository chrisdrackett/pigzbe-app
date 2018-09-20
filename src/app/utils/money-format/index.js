import BigNumber from 'bignumber.js';

export default (amount, dp = 2) => {
    if (typeof amount === 'number') {
        amount = amount.toFixed(8);
    }
    const num = new BigNumber(amount);
    return num.toFormat(Math.min(Math.max(num.dp(), 2), dp));
};
