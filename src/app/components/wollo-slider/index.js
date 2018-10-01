
import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {connect} from 'react-redux';
import Slider from 'app/components/slider';
import AmountExchange from 'app/components/amount-exchange';

import styles from './styles';

export class WolloSlider extends Component {
    static defaultProps = {
        sliderValueToAmount: value => {
            return Math.round(value * 100);
        },
        actionLabel: 'Select an amount',
        onChange: () => {},
    }
    state = {
        sliderValue: 0,
        amount: 0,
    }
    render() {
        const {exchange, baseCurrency, actionLabel, sliderValueToAmount, onChange} = this.props;
        return (
            <View>
                <View style={styles.valueWrapper}>
                    <View style={[styles.value, {
                        left: `${this.state.sliderValue * 100}%`,
                        opacity: this.state.amount ? 1 : 0,
                    }]}>
                        <Text style={styles.valueText}>{this.state.amount}</Text>
                        <View style={styles.valuePoint}/>
                    </View>
                </View>

                <Slider onValueChange={sliderValue => {
                    const amount = sliderValueToAmount(sliderValue);
                    this.setState({
                        sliderValue,
                        amount,
                    });
                    onChange(amount);
                }} />

                {this.state.sliderValue === 0 ? (
                    <Text style={styles.exchange}>{actionLabel}</Text>
                ) : (
                    <AmountExchange
                        style={styles.exchange}
                        amount={this.state.amount}
                        exchange={exchange}
                        baseCurrency={baseCurrency}
                    />
                )}
            </View>
        );
    }
}

export default connect((state) => ({
    baseCurrency: state.settings.baseCurrency,
    exchange: state.coins.exchange,
}))(WolloSlider);
