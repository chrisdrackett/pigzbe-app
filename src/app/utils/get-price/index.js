import moneyFormat from 'app/utils/money-format';
import {CURRENCIES, ASSET_CODE} from 'app/constants';
import {ensureValidAmount} from '@pigzbe/stellar-utils';

export const getExchangedValue = (convertFrom, convertTo, exchange, balance = 1) => {
    let amount = 1;

    if (convertFrom !== convertTo) {
        amount = exchange[convertTo] || 0;

        if (convertFrom !== ASSET_CODE) {
            amount = amount * 1 / exchange[convertFrom];
        }
    }

    return amount * Number(balance);
};

export default (convertFrom, convertTo, exchange, balance = 1, showSymbol = true, extraDps = 0) => {
    if (!exchange) {
        return '';
    }

    const currency = CURRENCIES[convertTo];

    const value = getExchangedValue(convertFrom, convertTo, exchange, balance);

    // console.log('=========> convertFrom', convertFrom);
    // console.log('=========> convertTo', convertTo);
    // console.log('=========> amount', amount);
    // console.log('=========> balance', balance);
    // console.log('=========> currency', currency);
    // console.log('=========> moneyFormat(amount * Number(balance), currency.dps)', moneyFormat(amount * Number(balance), currency.dps));

    const dps = currency.dps > 0 ? currency.dps + extraDps : currency.dps;

    const price = moneyFormat(ensureValidAmount(value), dps);

    return showSymbol ? currency.appendSymbol ? `${price} ${currency.symbol}` : `${currency.symbol}${price}` : price;
};
