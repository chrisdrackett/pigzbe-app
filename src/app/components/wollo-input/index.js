import React, {Component, Fragment} from 'react';
import {Text, View} from 'react-native';
import styles from './styles';
import TextInput from '../text-input';
import CurrencyToggle from '../currency-toggle';
import moneyFormat from '../../utils/money-format';
import {COIN_SYMBOLS, COIN_DPS, ASSET_CODE} from '../../constants';
// import isAndroid from '../../utils/is-android';


export default class WolloInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            wolloAmount: null,
            currentCurrency: props.currency,
            currencyAmount: 0,
            exchangedValue: 0,
            exchangedDisplay: `${COIN_SYMBOLS[props.currency]}${moneyFormat(0, COIN_DPS[props.currency])}`
        };
    }

    setExchangedValue = (amount, currentCurrency) => {
        const {exchange, currency, onChangeAmount} = this.props;

        const exchangedValue = currentCurrency === ASSET_CODE ? amount / exchange : amount * exchange;
        const symbol = COIN_SYMBOLS[currentCurrency];

        this.setState({
            exchangedValue,
            exchangedDisplay: `${symbol} ${moneyFormat(exchangedValue, COIN_DPS[currency])}`,
        });

        onChangeAmount(currentCurrency === ASSET_CODE ? exchangedValue * 1 : amount * 1);
    }

    onChangeText = amount => {
        this.setState({currencyAmount: amount});
        this.setExchangedValue(amount, this.state.currentCurrency);
    }

    onCurrencyChange = currency => {
        this.setState({currentCurrency: currency});
        this.setExchangedValue(this.state.currencyAmount, currency);
    }

    render() {
        const {exchangedDisplay, currencyAmount} = this.state;
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
                <Text style={styles.text}>
                    Estimate: {exchangedDisplay}
                </Text>
            </Fragment>
        );
    }
}
