import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import styles from './styles';
import Wollo from '../wollo';
import Slider from '../slider';
import Button from '../button';
import AmountExchange from '../amount-exchange';
import KidAvatar from '../kid-avatar';

const MAX_AMOUNT = 100;

const getAmount = (value, balance) => {
    const max = Math.min(balance, MAX_AMOUNT);
    return Math.round(value * Math.floor(Number(max)));
};

export default class Kids extends Component {

    state = {
        value: 0,
        amount: 0
    }

    static defaultProps = {
        parentBalance: 100,
    }

    componentDidUpdate(prevProps) {
        if (this.props.balance !== prevProps.balance) {
            this.setState({value: 0, amount: 0});
        }
    }

    onDashboard = () => this.props.onDashboard(this.props.address)

    onSliderChange = value => this.setState({
        value,
        amount: getAmount(value, this.props.parentBalance)
    })

    onSend = () => this.props.onSend(this.props.name, this.props.address, this.state.amount)

    render () {
        const {name, photo, balance, exchange, baseCurrency} = this.props;

        return (
            <View style={styles.kid}>
                <TouchableOpacity style={styles.id} onPress={this.onDashboard}>
                    <KidAvatar photo={photo}/>
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
                        left: `${this.state.value * 100}%`,
                        opacity: this.state.amount ? 1 : 0,
                    }]}>
                        <Text style={styles.valueText}>{this.state.amount}</Text>
                        <View style={styles.valuePoint}/>
                    </View>
                </View>
                <Slider value={this.state.value} onValueChange={this.onSliderChange}/>
                {this.state.value === 0 ? (
                    <Text style={styles.exchange}>Send Wollo</Text>
                ) : (
                    <AmountExchange
                        style={styles.exchange}
                        amount={this.state.amount}
                        exchange={exchange}
                        baseCurrency={baseCurrency}
                    />
                )}
                <Button
                    disabled={this.state.amount === 0}
                    label="Send Wollo"
                    onPress={this.onSend}
                />
            </View>
        );
    }
}
