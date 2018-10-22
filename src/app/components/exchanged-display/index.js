import React from 'react';
import {connect} from 'react-redux';
import {Text} from 'react-native';
import styles from './styles';
import moneyFormat from '../../utils/money-format';
import {ASSET_CODE, CURRENCIES} from '../../constants';

const exchangedDisplay = ({amount, currency, exchange, baseCurrency, style}) => {
    const value = currency === ASSET_CODE ? amount * exchange[baseCurrency] : amount / exchange[baseCurrency];
    const symbol = currency === ASSET_CODE ? CURRENCIES[baseCurrency].symbol : CURRENCIES[ASSET_CODE].symbol;
    const display = `${symbol}${moneyFormat(value, CURRENCIES[baseCurrency].dps)}`;

    return (
        <Text style={[styles.text, style]}>
            Estimate: {display}
        </Text>
    );
};

export default connect(state => ({
    baseCurrency: state.settings.baseCurrency,
    exchange: state.exchange.exchange,
}))(exchangedDisplay);
