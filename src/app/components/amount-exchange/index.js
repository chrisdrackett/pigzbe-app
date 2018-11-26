import React from 'react';
import {Text} from 'react-native';
import getPrice from 'app/utils/get-price';

export default ({amount, exchange, baseCurrency, style, selectedToken}) => (
    <Text style={style}>
        {getPrice(selectedToken, baseCurrency, exchange, amount)}
    </Text>
);
