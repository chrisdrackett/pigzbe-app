import React, {Component} from 'react';
import {Text, TouchableOpacity, View, Animated} from 'react-native';
import styles from './styles';
import {ASSET_CODE, CURRENCIES} from '../../constants';
import Icon from 'app/components/icon';

export default class CurrencyToggle extends Component {
    state = {
        currentCurrency: this.props.coin,
        left: new Animated.Value(2),
    }

    static defaultProps = {
        coin: ASSET_CODE,
    }

    onClicked = () => {
        const {currentCurrency, left} = this.state;
        const {coin, currency} = this.props;

        const newLeftPosition = currentCurrency === coin ? 36 : 2;

        this.setState({
            currentCurrency: currentCurrency === coin ? currency : coin,
        }, () => {
            this.props.onCurrencyChange(this.state.currentCurrency);
        });

        Animated.timing(left, {
            toValue: newLeftPosition,
            duration: 300,
        }).start();
    }

    render() {
        const {currency} = this.props;

        return (
            <TouchableOpacity style={styles.container} onPress={this.onClicked}>
                <Animated.View style={[styles.handle, {left: this.state.left}]} />
                <View style={styles.iconContainer}>
                    <Icon style={styles.icon} name={this.props.coin} />
                </View>
                <View style={styles.iconContainer}>
                    {!CURRENCIES[currency].icon &&
                        <Text style={styles.text}>{CURRENCIES[currency].symbol}</Text>
                    }
                    {!!CURRENCIES[currency].icon &&
                        <Icon style={styles.icon} aspectRatio={1} name={CURRENCIES[currency].icon} />
                    }
                </View>
            </TouchableOpacity>
        );
    }
}
