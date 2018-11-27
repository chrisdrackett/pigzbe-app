import moneyFormat from 'app/utils/money-format';
import {CURRENCIES, ASSET_CODE} from 'app/constants';
import {ensureValidAmount} from '@pigzbe/stellar-utils';

export default (convertFrom = ASSET_CODE, convertTo, exchange, balance = 1, showSymbol = true, extraDps = 0) => {
    if (!exchange) {
        return '';
    }

    const currency = CURRENCIES[convertTo];

    let amount = ensureValidAmount(exchange[convertTo] || 0);

    if (convertFrom !== ASSET_CODE) {
        amount = amount * 1 / exchange[convertFrom];
    }

    // console.log('=========> convertFrom', convertFrom);
    // console.log('=========> convertTo', convertTo);
    // console.log('=========> amount', amount);
    // console.log('=========> balance', balance);
    // console.log('=========> currency', currency);
    // console.log('=========> moneyFormat(amount * Number(balance), currency.dps)', moneyFormat(amount * Number(balance), currency.dps));

    const dps = currency.dps > 0 ? currency.dps + extraDps : currency.dps;

    const value = moneyFormat(amount * Number(balance), dps);

    return showSymbol ? currency.appendSymbol ? `${value} ${currency.symbol}` : `${currency.symbol}${value}` : value;
};
