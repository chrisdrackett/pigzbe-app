import React, {Component, Fragment} from 'react';
import {Text, View} from 'react-native';
import styles from './styles';
import TextInput from '../text-input';
import CurrencyToggle from '../currency-toggle';
import moneyFormat from '../../utils/money-format';
import {COIN_SYMBOLS, COIN_DPS} from '../../constants';
// import isAndroid from '../../utils/is-android';


export default class WolloInput extends Component {
    state = {
        wolloAmount: null,
        currentCurrency: 'wollos',
        currencyAmount: 0,
        exchangedValue: 0,
        exchangedDisplay: `${COIN_SYMBOLS[this.props.currency]}${moneyFormat(0, COIN_DPS[this.props.currency])}`
    }

    setExchangedValue = (amount, currentCurrency) => {
        const {exchange, currency} = this.props;

        const exchangedValue = currentCurrency === 'wollo' ? amount / exchange : amount * exchange;
        const symbol = currentCurrency === 'wollo' ? 'Wollos' : COIN_SYMBOLS[currency];

        this.setState({
            exchangedValue,
            exchangedDisplay: `${symbol} ${moneyFormat(exchangedValue, COIN_DPS[currency])}`,
        });

        this.props.onChangeAmount(currentCurrency === 'wollo' ? exchangedValue : amount);
    }

    onChangeText = amount => {
        this.setState({amount});

        this.setState({currencyAmount: amount});
        this.setExchangedValue(amount, this.state.currentCurrency);
    }

    onCurrencyChange = currency => {
        this.setState({currentCurrency: currency});

        this.setExchangedValue(this.state.currencyAmount, currency);
    }

    render() {
        const {exchangedDisplay, currencyAmount, currentCurrency} = this.state;
        const {currency} = this.props;

        return (
            <Fragment>
                <View style={styles.inputSection}>
                    <TextInput
                        numberOfLines={1}
                        placeholder="0.00 Wollo"
                        onChangeText={this.onChangeText}
                        returnKeyType="done"
                        value={currencyAmount === 0 ? '' : currencyAmount.toString()}
                        style={styles.textInput}
                    />
                    <CurrencyToggle
                        currency={currency}
                        onCurrencyChange={this.onCurrencyChange}
                    />
                </View>
                {
                    currentCurrency === 'wollos' ?
                        <Text style={styles.text}>
                            Estimate: {exchangedDisplay}
                        </Text>
                        :
                        <Text style={styles.text}>
                            Estimate: {exchangedDisplay}
                        </Text>
                }
            </Fragment>
        );
    }
}
