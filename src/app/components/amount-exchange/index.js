import React from 'react';
import {Text} from 'react-native';
import moneyFormat from '../../utils/money-format';
import {COIN_SYMBOLS, COIN_DPS} from '../../constants';

export default ({amount, exchange, baseCurrency, style}) => {
    const multiplier = exchange ? exchange[baseCurrency] : 0;
    return (
        <Text style={style}>
            {COIN_SYMBOLS[baseCurrency]}
            {moneyFormat(amount * multiplier, COIN_DPS[baseCurrency])}
        </Text>
    );
};
