import React, {Component, Fragment} from 'react';
import {Text, TouchableOpacity} from 'react-native';
// import styles from './styles';
import {color} from '../../styles';
// import isAndroid from '../../utils/is-android';


const containerStyle = {
    background: color.blue,
    height: 45,
    borderRadius: 22.5,
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
        return (
            <TouchableOpacity style={containerStyle}>
                <Text>Currency Toggle</Text>
            </TouchableOpacity>
        );
    }
}
