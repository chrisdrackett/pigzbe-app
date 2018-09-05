import React, {Component, Fragment} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
// import styles from './styles';
import {color} from '../../styles';
// import isAndroid from '../../utils/is-android';


const containerStyle = {
    backgroundColor: color.blue,
    height: 45,
    borderRadius: 22.5,
    width: 90,
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
    right: 15,
    top: 15,
};

export default class CurrencyToggle extends Component {
    state = {
        currentCurrency: 'wollo',
    }

    onClicked = () => {
        const {currentCurrency} = this.state;
        const {currency} = this.props;

        this.setState({currentCurrency: currentCurrency === 'wollo' ? currency : 'wollo'});

        this.props.currencyChange(this.state.currentCurrency);
    }

    render() {
        const {currency} = this.props;

        console.log('>>> currency toggle props', this.props);

        return (
            <TouchableOpacity style={containerStyle}>
                <View style={wolloStyle}><Text style={textStyle}>W</Text></View>
                <View style={currencyStyle}><Text style={textStyle}>{currency.short}</Text></View>
            </TouchableOpacity>
        );
    }
}
