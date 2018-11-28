import React from 'react';
import {connect} from 'react-redux';
import {Text} from 'react-native';
import styles from './styles';
import getPrice from 'app/utils/get-price';

const ExchangedDisplay = ({
    amount,
    exchange,
    label = 'Estimate:',
    currencyFrom = null,
    currencyTo = null,
    extraDps = 0,
    style
}) => {

    const price = getPrice(currencyFrom, currencyTo, exchange, amount, true, extraDps);

    return (
        <Text style={[styles.text, style]}>
            {label} {price}
        </Text>
    );
};

export default connect(state => ({
    baseCurrency: state.settings.baseCurrency,
    exchange: state.exchange.exchange,
}))(ExchangedDisplay);
