import React from 'react';
import {connect} from 'react-redux';
import {Text} from 'react-native';
import styles from './styles';
import {ASSET_CODE} from '../../constants';
import getPrice from 'app/utils/get-price';

const ExchangedDisplay = ({
    amount,
    currency,
    exchange,
    baseCurrency,
    style,
    selectedToken = ASSET_CODE
}) => {

    const convertTo = currency === baseCurrency ? selectedToken : baseCurrency;
    const price = getPrice(currency, convertTo, exchange, amount);

    return (
        <Text style={[styles.text, style]}>
            Estimate: {price}
        </Text>
    );
};

export default connect(state => ({
    baseCurrency: state.settings.baseCurrency,
    exchange: state.exchange.exchange,
}))(ExchangedDisplay);
