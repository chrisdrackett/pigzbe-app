import React, {Component, Fragment} from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import styles from './styles';
import TextInput from '../text-input';
import CurrencyToggle from '../currency-toggle';
import moneyFormat from '../../utils/money-format';
import {ASSET_CODE, CURRENCIES} from '../../constants';
import ExchangedDisplay from '../exchanged-display';
import {getExchangedValue} from 'app/utils/get-price';

export class PaymentInput extends Component {
    state = {
        currentCurrency: this.props.selectedToken,
        currencyAmount: this.props.initialAmount,
        exchangedValue: 0,
    }

    static defaultProps = {
        selectedToken: ASSET_CODE,
        initialAmount: 0,
        showEstimate: true,
        balance: null,
    }

    componentDidMount() {
        this.setExchangedValue(this.state.currencyAmount, this.state.currentCurrency);
    }

    setExchangedValue = (amount, currentCurrency) => {
        const {exchange, baseCurrency, selectedToken, onChangeAmount} = this.props;

        const currencyFrom = currentCurrency === baseCurrency ? baseCurrency : selectedToken;
        const currencyTo = currentCurrency === baseCurrency ? selectedToken : baseCurrency;

        const exchangedValue = getExchangedValue(currencyFrom, currencyTo, exchange, amount);

        this.setState({
            exchangedValue,
        });

        onChangeAmount(currentCurrency === selectedToken ? amount * 1 : exchangedValue * 1);
    }

    onChangeText = amount => {
        this.setState({currencyAmount: amount});
        this.setExchangedValue(amount, this.state.currentCurrency);
    }

    onCurrencyChange = currency => {
        console.log('onCurrencyChange', currency);
        this.setState({currentCurrency: currency});
        this.setExchangedValue(this.state.currencyAmount, currency);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.baseCurrency !== this.props.baseCurrency) {
            // If current currency isn't wollo, we need to update it to the new base currency
            if (this.state.currentCurrency === prevProps.baseCurrency) {
                this.onCurrencyChange(this.props.baseCurrency);
            } else {
                // Else just refresh the exchanged values
                this.setExchangedValue(this.state.currencyAmount, this.state.currentCurrency);
            }
        }

        if (prevProps.selectedToken !== this.props.selectedToken) {
            if (this.state.currentCurrency === prevProps.selectedToken) {
                this.onCurrencyChange(this.props.selectedToken);
            } else {
                this.setExchangedValue(this.state.currencyAmount, this.state.currentCurrency);
            }
        }
    }

    render() {
        const {currencyAmount, currentCurrency} = this.state;
        const {selectedToken, baseCurrency, ...restOfProps} = this.props;

        const placeholder = baseCurrency === currentCurrency ?
            (CURRENCIES[baseCurrency].symbol + moneyFormat(0, CURRENCIES[baseCurrency].dps))
            :
            `0 ${CURRENCIES[currentCurrency].symbol}`;

        console.log('currentCurrency', currentCurrency);

        return (
            <Fragment>
                <View style={styles.inputSection}>
                    <View style={styles.textInput}>
                        <TextInput
                            {...restOfProps}
                            numberOfLines={1}
                            placeholder={placeholder}
                            onChangeText={this.onChangeText}
                            returnKeyType="done"
                            value={currencyAmount === 0 ? '' : currencyAmount.toString()}
                            showTopPlaceholder={false}
                            keyboardType="numeric"
                        />
                    </View>
                    <View style={styles.toggle}>
                        <CurrencyToggle
                            coin={selectedToken}
                            currency={baseCurrency}
                            onCurrencyChange={this.onCurrencyChange}
                        />
                    </View>
                </View>
                {this.props.showEstimate && (
                    <ExchangedDisplay
                        amount={currencyAmount}
                        currencyFrom={currentCurrency}
                        currencyTo={currentCurrency === baseCurrency ? selectedToken : baseCurrency}
                    />
                )}
                {this.props.balance && (
                    <ExchangedDisplay
                        label="Current balance:"
                        amount={this.props.balance}
                        currencyFrom={selectedToken}
                        currencyTo={currentCurrency}
                    />
                )}
                {this.props.availableBalance && (
                    <ExchangedDisplay
                        label="Available balance:"
                        amount={this.props.availableBalance}
                        currencyFrom={selectedToken}
                        currencyTo={currentCurrency}
                    />
                )}
            </Fragment>
        );
    }
}

export default connect(state => ({
    baseCurrency: state.settings.baseCurrency,
    exchange: state.exchange.exchange,
}))(PaymentInput);
