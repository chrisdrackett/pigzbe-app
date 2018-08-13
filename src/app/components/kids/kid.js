import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import styles from './styles';
import Wollo from '../wollo';
import Slider from '../slider';
import Button from '../button';
import AmountExchange from '../amount-exchange';

const MAX_AMOUNT = 100;

const getValue = (value, balance) => {
    const max = Math.min(balance, MAX_AMOUNT);
    return Math.round(value * Math.floor(Number(max)));
};

export default class Kids extends Component {

    state = {
        value: 0,
        progress: 0
    }

    static defaultProps = {
        parentBalance: 100,
    }

    gotoKid = () => {
        console.log('go to kid', this.props.address);
    }

    onSliderChange = value => this.setState({
        progress: value,
        value: getValue(value, this.props.parentBalance)
    })

    onSend = () => {
        console.log('send to', this.props.address);
    }

    render () {
        const {name, photo, balance, exchange, baseCurrency} = this.props;

        return (
            <View style={styles.kid}>
                <TouchableOpacity style={styles.id} onPress={this.gotoKid}>
                    {photo ? (
                        <Image style={[styles.image, styles.photo]} source={{uri: photo}}/>
                    ) : (
                        <Image style={styles.image} source={require('./images/kid.png')}/>
                    )}
                    <Text style={styles.name}>{name}</Text>
                    <View style={styles.balance}>
                        <Wollo
                            dark
                            balance={balance}
                            exchange={exchange}
                            baseCurrency={baseCurrency}
                        />
                        <Image style={styles.chevron} source={require('./images/chevron.png')}/>
                    </View>
                </TouchableOpacity>
                <View style={styles.valueWrapper}>
                    <View style={[styles.value, {
                        left: `${this.state.progress * 100}%`,
                        opacity: this.state.value ? 1 : 0,
                    }]}>
                        <Text style={styles.valueText}>{this.state.value}</Text>
                        <View style={styles.valuePoint}/>
                    </View>
                </View>
                <Slider onValueChange={this.onSliderChange}/>
                {this.state.value === 0 ? (
                    <Text style={styles.exchange}>Send Wollo</Text>
                ) : (
                    <AmountExchange
                        style={styles.exchange}
                        amount={this.state.value}
                        exchange={exchange}
                        baseCurrency={baseCurrency}
                    />
                )}
                <Button
                    disabled={this.state.value === 0}
                    label="Send Wollo"
                    onPress={this.onSend}
                />
            </View>
        );
    }
}
