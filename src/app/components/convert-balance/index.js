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
import moneyFormat from '../../utils/money-format';
import {CURRENCIES, ASSET_CODE} from '../../constants';

const ConvertBalance = ({exchange, balance, coins}) => (
    <View style={styles.container}>
        <Text style={styles.title}>
            <Text style={styles.bold}>{moneyFormat(balance, CURRENCIES[ASSET_CODE].dps)}</Text> Wollo Converted
        </Text>
        <View style={styles.containerCoins}>
            {coins.map(c => (
                <CoinCompare
                    key={c}
                    coin={c}
                    value={exchange ? exchange[c] * balance : 0}
                    dp={CURRENCIES[c].dps}
                />
            ))}
        </View>
        <Text
            style={styles.label}
            onPress={() => openURL(strings.walletConversionCreditUrl)}>
            Prices by <Text style={[styles.label, styles.underline]}>CryptoCompare</Text>
        </Text>
    </View>
);

export default ConvertBalance;
