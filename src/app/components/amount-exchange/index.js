import React from 'react';
import {Text} from 'react-native';
import moneyFormat from '../../utils/money-format';
import {COIN_SYMBOLS, COIN_DPS} from '../../constants';

export default ({amount, exchange, baseCurrency, style}) => (
    <Text style={style}>{COIN_SYMBOLS[baseCurrency]}
        {moneyFormat(amount * exchange[baseCurrency], COIN_DPS[baseCurrency])}
    </Text>
);
