import React, {Component, Fragment} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
// import styles from './styles';
import {color} from '../../styles';
// import isAndroid from '../../utils/is-android';


const containerStyle = {
    backgroundColor: color.lighterBlue,
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
    }

    onClicked = () => {
        const {currentCurrency} = this.state;
        const {currency} = this.props;

        this.setState({currentCurrency: currentCurrency === 'wollo' ? currency : 'wollo'});

        this.props.currencyChange(this.state.currentCurrency);
    }

    render() {
        const {currency} = this.props;
        const {currentCurrency} = this.state;

        console.log('>>> currency toggle props', this.props, currentCurrency);

        const left = currentCurrency === 'wollo' ? 2 : 46;

        return (
            <TouchableOpacity style={containerStyle} onPress={this.onClicked}>
                <View style={{...handleStyle, left}} />
                <View style={wolloStyle}><Text style={textStyle}>W</Text></View>
                <View style={currencyStyle}><Text style={textStyle}>{currency.short}</Text></View>
            </TouchableOpacity>
        );
    }
}
