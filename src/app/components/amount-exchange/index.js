import React from 'react';
import {Text} from 'react-native';
import moneyFormat from '../../utils/money-format';
import {CURRENCIES} from '../../constants';

export default ({amount, exchange, baseCurrency, style}) => {
    const multiplier = exchange ? exchange[baseCurrency] : 0;
    const {symbol, dps} = CURRENCIES[baseCurrency];
    return (
        <Text style={style}>
            {symbol}{moneyFormat(amount * multiplier, dps)}
        </Text>
    );
};
