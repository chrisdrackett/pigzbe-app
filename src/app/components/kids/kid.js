import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import styles from './styles';
import Wollo from '../wollo';
import Slider from '../slider';
import Button from '../button';
import AmountExchange from '../amount-exchange';

export default class Kids extends Component {

    state = {
        value: 0
    }

    static defaultProps = {
        kids: [],
    }

    gotoKid = () => {
        console.log('go to kid', this.props.address);
    }

    onSliderChange = value => this.setState({value: Math.round(value * 100)})

    onSend = () => {
        console.log('send to', this.props.address);
    }

    render () {
        const {name, photo, balance, exchange, baseCurrency} = this.props;

        // TODO: calc max value based on balance available

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
                        left: `${this.state.value}%`
                    }]}>
                        <Text style={styles.valueText}>{this.state.value}</Text>
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
