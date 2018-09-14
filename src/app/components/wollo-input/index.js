import React, {Component, Fragment} from 'react';
import {Text, View} from 'react-native';
import { connect } from "react-redux";
import styles from './styles';
import TextInput from '../text-input';
import CurrencyToggle from '../currency-toggle';
import moneyFormat from '../../utils/money-format';
import {ASSET_CODE, CURRENCIES} from '../../constants';
// import isAndroid from '../../utils/is-android';


export class WolloInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            wolloAmount: null,
            currentCurrency: props.currency,
            currencyAmount: 0,
            exchangedValue: 0,
            exchangedDisplay: `${CURRENCIES[props.currency].symbol}${moneyFormat(0, CURRENCIES[props.currency].dps)}`
        };
    }

    setExchangedValue = (amount, currentCurrency) => {
        const {exchange, currency, onChangeAmount} = this.props;
        const exchangedValue = currentCurrency === ASSET_CODE ? amount / exchange[currency] : amount * exchange[currency];
        const symbol = CURRENCIES[currentCurrency].symbol;

        this.setState({
            exchangedValue,
            exchangedDisplay: `${symbol}${moneyFormat(exchangedValue, CURRENCIES[currency].dps)}`,
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
            (CURRENCIES[currency].symbol + moneyFormat(0, CURRENCIES[currency].dps));

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

export default connect(state => ({
    currency: state.wollo.baseCurrency,
    exchange: state.coins.exchange,
}))(WolloInput);
