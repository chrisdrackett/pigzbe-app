import React, {Component} from 'react';
import {View} from 'react-native';
import {storiesOf} from '@storybook/react-native';
import PaymentInput from '../../src/app/components/payment-input';
import {Provider} from 'react-redux';
import {createStore, combineReducers} from 'redux';

const store = createStore(combineReducers({
    settings: () => ({
        baseCurrency: 'GBP'
    }),
    exchange: () => ({
        exchange: {
            XLM: 0.3936,
            BTC: 0.0000147,
            ETH: 0.00025584,
            EUR: 0.102828,
            USD: 0.12,
            JPY: 13.8984,
            GBP: 0.091956,
            GOLD: 0.0031452,
            WLO: 1,
        }
    })
}));

const style = {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 40,
};

class PaymentInputComponent extends Component {
    state = {
        input: ''
    }

    onChangeAmount = amount => console.log('Payment amount set to: ', amount);

    render() {
        return (
            <View style={style}>
                <PaymentInput
                    selectedToken={this.props.selectedToken}
                    onChangeAmount={this.onChangeAmount}
                />
            </View>
        );
    }
}

storiesOf('Payment Input')
    .addDecorator(story => <Provider store={store}>{story()}</Provider>)
    .add('default', () => (
        <PaymentInputComponent />
    ))
    .add('xlm', () => (
        <PaymentInputComponent selectedToken={'XLM'} />
    ));
