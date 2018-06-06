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
import CoinCompare from '../coin-compare';
import Title from '../title';

const ConvertBalance = ({exchange, balance, coins, dps}) => (
    <View style={styles.container}>
        <Title>{strings.walletConversionTitle}</Title>
        <Text
            style={styles.label}
            onPress={() => openURL(strings.walletConversionCreditUrl)}>
            {strings.walletConversionCreditLabel}
        </Text>
        <View style={styles.containerCoins}>
            {coins.map(c => (
                <CoinCompare
                    key={c}
                    coin={c}
                    value={exchange ? exchange[c] * balance : 0}
                    dp={dps[c]}
                />
            ))}
        </View>
    </View>
);

export default ConvertBalance;
