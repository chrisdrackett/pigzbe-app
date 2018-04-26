import React from 'react';
import {
    View,
    Text,
    Image
} from 'react-native';
import styles from './styles';

export default ({
    coin, value
}) => (
    <View style={styles.container}>
        <Image style={styles.coin} source={require(`../../../../assets/images/coin-${coin.toLowerCase()}.png`)} />
        <Text style={styles.coinName}>{coin.toUpperCase()}</Text>
        <Text style={styles.value}>{Number(value).toFixed(5)}</Text>
    </View>
);
