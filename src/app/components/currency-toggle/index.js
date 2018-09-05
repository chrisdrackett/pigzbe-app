import React, {Component} from 'react';
import {Text, TouchableOpacity, View, Animated} from 'react-native';
// import styles from './styles';
import {color} from '../../styles';
// import isAndroid from '../../utils/is-android';


const containerStyle = {
    backgroundColor: color.lighterBlue,
    height: 45,
    borderRadius: 22.5,
    width: 80,
    position: 'relative',
};

const textStyle = {
    color: color.white,
};

const wolloStyle = {
    position: 'absolute',
    left: 15,
    top: 15,
};

const currencyStyle = {
    position: 'absolute',
    right: 17,
    top: 15,
};

const handleStyle = {
    position: 'absolute',
    backgroundColor: color.blue,
    height: 41,
    width: 41,
    borderRadius: 20.5,
    top: 2,
};

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

        this.props.currencyChange(this.state.currentCurrency);

        Animated.timing(left, {
            toValue: newLeftPosition,
            duration: 300,
        }).start();
    }

    render() {
        const {currency} = this.props;

        return (
            <TouchableOpacity style={containerStyle} onPress={this.onClicked}>
                <Animated.View style={[handleStyle, {left: this.state.left}]} />
                <View style={wolloStyle}><Text style={textStyle}>W</Text></View>
                <View style={currencyStyle}><Text style={textStyle}>{currency.short}</Text></View>
            </TouchableOpacity>
        );
    }
}
