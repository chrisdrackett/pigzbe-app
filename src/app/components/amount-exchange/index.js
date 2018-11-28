import React from 'react';
import {Text} from 'react-native';
import getPrice from 'app/utils/get-price';
import {ASSET_CODE} from 'app/constants';

export default ({amount, exchange, baseCurrency, style, selectedToken = ASSET_CODE}) => (
    <Text style={style}>
        {getPrice(selectedToken, baseCurrency, exchange, amount)}
    </Text>
);
