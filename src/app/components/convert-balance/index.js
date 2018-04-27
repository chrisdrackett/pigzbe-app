import React from 'react';
import {
    View,
    Text
} from 'react-native';
import styles from './styles';
import {
    strings
} from '../../constants';
import openURL from '../../utils/open-url';
import Coin from '../coin-compare';

const ConvertBalance = ({exchange, balance, coins}) => (
    <View style={styles.container}>
        <Text style={styles.title}>{strings.walletConversionTitle}</Text>
        <Text
            style={styles.label}
            onPress={() => openURL(strings.walletConversionCreditUrl)}>
            {strings.walletConversionCreditLabel}
        </Text>
        <View style={styles.containerCoins}>
            {coins.map(c => <Coin key={c} coin={c} value={exchange[c.toUpperCase()] * balance}/>)}
        </View>
    </View>
);

export default ConvertBalance;
