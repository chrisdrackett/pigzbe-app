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
            wolloAmount: props.initial || null,
            currentCurrency: props.currency,
            currencyAmount: props.initial,
            exchangedValue: props.initial * props.exchange,
            exchangedDisplay: `${COIN_SYMBOLS[props.currency]}${moneyFormat(props.initial * props.exchange || 0, COIN_DPS[props.currency])}`
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
        const {exchangedDisplay, currencyAmount, currentCurrency} = this.state;
        const {currency, ...restOfProps} = this.props;

        const placeholder = currency === currentCurrency ? '0 Wollo' :
            (COIN_SYMBOLS[currency] + ' ' + moneyFormat(0, COIN_DPS[currency]));

        return (
            <Fragment>
                <View style={styles.inputSection}>
                    <TextInput
                        {...restOfProps}
                        numberOfLines={1}
                        placeholder={placeholder}
                        onChangeText={this.onChangeText}
                        returnKeyType="done"
                        value={currencyAmount === 0 ? '' : currencyAmount.toString()}
                        style={styles.textInput}
                        showTopPlaceholder={false}
                    />
                    <View style={styles.toggle}>
                        <CurrencyToggle
                            currency={currency}
                            onCurrencyChange={this.onCurrencyChange}
                        />
                    </View>
                </View>
                <Text style={styles.text}>
                    Estimate: {exchangedDisplay}
                </Text>
            </Fragment>
        );
    }
}
