import React from 'react';
import {
    View,
    Text
} from 'react-native';
import styles from './styles';
import CoinIcon from '../coin-icon';

export default ({
    coin,
    value
}) => (
    <View style={styles.container}>
        <CoinIcon coin={coin} style={styles.coin}/>
        <Text style={styles.coinName}>{coin}</Text>
        <Text style={styles.value}>{value}</Text>
    </View>
);
