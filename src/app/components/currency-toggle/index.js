import React, {Component} from 'react';
import {Text, TouchableOpacity, View, Animated, Image} from 'react-native';
import styles from './styles';
import {COIN_SYMBOLS} from '../../constants';
// import isAndroid from '../../utils/is-android';


const WolloImage = () => <Image style={styles.wollo} source={require('./images/wollo.png')}/>;

export default class CurrencyToggle extends Component {
    state = {
        currentCurrency: 'wollo',
        left: new Animated.Value(2),
    }

    onClicked = () => {
        const {currentCurrency, left} = this.state;
        const {currency} = this.props;

        const newLeftPosition = currentCurrency === 'wollo' ? 36 : 2;

        this.setState({
            currentCurrency: currentCurrency === 'wollo' ? currency : 'wollo',
        });

        this.props.onCurrencyChange(this.state.currentCurrency);

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
                <WolloImage />
                <View style={styles.currency}><Text style={styles.text}>{COIN_SYMBOLS[currency]}</Text></View>
            </TouchableOpacity>
        );
    }
}
