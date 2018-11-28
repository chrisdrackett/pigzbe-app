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

    componentDidUpdate(prevProps) {
        if (prevProps.coin !== this.props.coin && this.state.currentCurrency === prevProps.coin) {
            this.setState({currentCurrency: this.props.coin});
        }
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
        const coin = CURRENCIES[currency];

        return (
            <TouchableOpacity style={styles.container} onPress={this.onClicked}>
                <Animated.View style={[styles.handle, {left: this.state.left}]} />
                <View style={styles.iconContainer}>
                    <Icon style={styles.icon} name={this.props.coin} />
                </View>
                <View style={styles.iconContainer}>
                    {!coin.icon &&
                        <Text style={styles.text}>{coin.symbol}</Text>
                    }
                    {!!coin.icon &&
                        <Icon style={styles.icon} aspectRatio={1} name={coin.icon} />
                    }
                </View>
            </TouchableOpacity>
        );
    }
}
