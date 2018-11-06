import React, {Component, Fragment} from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import styles from './styles';
import TextInput from '../text-input';
import CurrencyToggle from '../currency-toggle';
import moneyFormat from '../../utils/money-format';
import {ASSET_CODE, CURRENCIES} from '../../constants';
import ExchangedDisplay from '../exchanged-display';

export class WolloInput extends Component {
    state = {
        currentCurrency: this.props.initialCurrency,
        currencyAmount: this.props.initialAmount,
        exchangedValue: 0,
    }

    static defaultProps = {
        initialCurrency: ASSET_CODE,
        initialAmount: 0,
    }

    componentDidMount() {
        this.setExchangedValue(this.state.currencyAmount, this.state.currentCurrency);
    }

    setExchangedValue = (amount, currentCurrency) => {
        const {exchange, baseCurrency, onChangeAmount} = this.props;
        amount = amount ? String(amount).replace(/,/g, '') : amount;
        const exchangedValue = currentCurrency === ASSET_CODE ? amount * exchange[baseCurrency] : amount / exchange[baseCurrency];

        this.setState({
            exchangedValue,
        });

        onChangeAmount(currentCurrency === ASSET_CODE ? amount * 1 : exchangedValue * 1);
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
            if (this.state.currentCurrency !== ASSET_CODE) {
                this.onCurrencyChange(this.props.baseCurrency);
            } else {
                // Else just refresh the exchanged values
                this.setExchangedValue(this.state.currencyAmount, this.state.currentCurrency);
            }
        }
    }

    render() {
        const {currencyAmount, currentCurrency} = this.state;
        const {baseCurrency, ...restOfProps} = this.props;
        const placeholder = baseCurrency === currentCurrency ?
            (CURRENCIES[baseCurrency].symbol + moneyFormat(0, CURRENCIES[baseCurrency].dps))
            :
            '0 WLO';

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
                            currency={baseCurrency}
                            onCurrencyChange={this.onCurrencyChange}
                        />
                    </View>
                </View>
                <ExchangedDisplay
                    amount={currencyAmount ? String(currencyAmount).replace(/,/g, '') : null}
                    currency={currentCurrency}
                />
            </Fragment>
        );
    }
}

export default connect(state => ({
    baseCurrency: state.settings.baseCurrency,
    exchange: state.exchange.exchange,
}))(WolloInput);
