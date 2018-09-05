import React, {Component, Fragment} from 'react';
import {Text} from 'react-native';
// import styles from './styles';
import {color} from '../../styles';
import TextInput from '../text-input';
import CurrencyToggle from '../currency-toggle';
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
        currency: {
            name: 'GBP',
            short: '£'
        },
        currentCurrency: 'wollos',
        currencyAmount: 0,
    }

    onChangeText = amount => {
        this.setState({amount});

        // todo calculate wollo value and send to prop
        this.props.onChangeAmount(amount);
    }

    onCurrencyChange = currency => {
        console.log(`currency has changed to ${currency}`);
    }

    render() {
        const {amount, short, currencyAmount, currentCurrency, currency} = this.state;

        return (
            <Fragment>
                <Fragment>
                    <TextInput
                        numberOfLines={1}
                        placeholder="0.00 wollo"
                        onChangeText={this.onChangeText}
                        returnKeyType="done"
                        value={amount}
                    />
                    <CurrencyToggle
                        currency={currency}
                        onCurrencyChange={this.onCurrencyChange}
                    />
                </Fragment>
                {
                    currentCurrency === 'wollos' ?
                        <Text style={textStyle}>
                            Estimate: {short} {currencyAmount}
                        </Text>
                        :
                        <Text style={textStyle}>
                            Estimate: Wollo {amount}
                        </Text>
                }
            </Fragment>
        );
    }
}
