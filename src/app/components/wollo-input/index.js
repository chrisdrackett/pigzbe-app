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
            currentCurrency: props.baseCurrency,
            currencyAmount: 0,
            exchangedValue: 0,
            exchangedDisplay: `${CURRENCIES[props.baseCurrency].symbol}${moneyFormat(0, CURRENCIES[props.baseCurrency].dps)}`
        };
    }

    setExchangedValue = (amount, currentCurrency) => {
        const {exchange, baseCurrency, onChangeAmount} = this.props;
        const exchangedValue = currentCurrency === ASSET_CODE ? amount / exchange[baseCurrency] : amount * exchange[baseCurrency];
        const symbol = CURRENCIES[currentCurrency].symbol;

        this.setState({
            exchangedValue,
            exchangedDisplay: `${symbol}${moneyFormat(exchangedValue, CURRENCIES[baseCurrency].dps)}`,
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

    componentDidUpdate(prevProps) {
        if (prevProps.baseCurrency !== this.props.baseCurrency) {
            // If current currency isn't wollo, we need to update it to the new base currency
            if (this.state.currentCurrency !== ASSET_CODE) {
                this.onCurrencyChange(this.props.baseCurrency);
            } else {
                // Else just refresh the exchanged values
                this.setExchangedValue(this.state.currencyAmount, this.state.currentCurrency);
            }
        }
    }

    render() {
        const {exchangedDisplay, currencyAmount, currentCurrency} = this.state;
        const {baseCurrency, ...restOfProps} = this.props;
        const placeholder = baseCurrency === currentCurrency ? '0 Wollo' : 
            (CURRENCIES[baseCurrency].symbol + moneyFormat(0, CURRENCIES[baseCurrency].dps));

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
                            currency={baseCurrency}
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
    baseCurrency: state.settings.baseCurrency,
    exchange: state.coins.exchange,
}))(WolloInput);
