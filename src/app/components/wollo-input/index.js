import React, {Component, Fragment} from 'react';
import {Text} from 'react-native';
// import styles from './styles';
import {color} from '../../styles';
import TextInput from '../text-input';
import CurrencyToggle from '../currency-toggle';
import moneyFormat from '../../utils/money-format';
import {COIN_SYMBOLS, COIN_DPS} from '../../constants';
// import isAndroid from '../../utils/is-android';


const textStyle = {
    color: color.blue,
    fontSize: 16,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 30,
    textAlign: 'center',
};

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

        console.log('setExchangedValue, ', exchange, exchangedValue, currentCurrency, amount);

        this.setState({
            exchangedValue,
            exchangedDisplay: `${COIN_SYMBOLS[currency]}${moneyFormat(0, COIN_DPS[currency])}`,
        });
    }

    onChangeText = amount => {
        this.setState({amount});

        // todo calculate wollo value and send to prop
        this.props.onChangeAmount(amount);

        this.setState({currencyAmount: amount});
        this.setExchangedValue(amount, this.state.currentCurrency);
    }

    onCurrencyChange = currency => {
        this.setState({currentCurrency: currency});

        this.setExchangedValue(this.state.currencyAmount, currency);
    }

    render() {
        const {exchangedDisplay, short, currencyAmount, currentCurrency, exchangedValue} = this.state;
        const {currency} = this.props;

        return (
            <Fragment>
                <Fragment>
                    <TextInput
                        numberOfLines={1}
                        placeholder="0.00 Wollo"
                        onChangeText={this.onChangeText}
                        returnKeyType="done"
                        value={currencyAmount === 0 ? '' : currencyAmount.toString()}
                    />
                    <CurrencyToggle
                        currency={currency}
                        onCurrencyChange={this.onCurrencyChange}
                    />
                </Fragment>
                {
                    currentCurrency === 'wollos' ?
                        <Text style={textStyle}>
                            Estimate: {short} {exchangedValue}
                        </Text>
                        :
                        <Text style={textStyle}>
                            Estimate: {exchangedDisplay}
                        </Text>
                }
            </Fragment>
        );
    }
}
