import React from 'react';
import {
    View,
    Text
} from 'react-native';
import styles from './styles';
import CoinIcon from '../coin-icon';
import moneyFormat from '../../utils/money-format';

export default ({
    coin,
    value,
    dp
}) => (
    <View style={styles.container}>
        <CoinIcon coin={coin} style={styles.coin}/>
        <Text style={styles.coinName}>{coin}</Text>
        <Text style={styles.value}>{moneyFormat(value, dp)}</Text>
    </View>
);
