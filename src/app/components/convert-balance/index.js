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
import {CURRENCIES, ASSET_CODE} from 'app/constants';
import getPrice from 'app/utils/get-price';

const ConvertBalance = ({exchange, balance, coins, selectedToken = ASSET_CODE, onOpenURL}) => (
    <View style={styles.container}>
        <Text style={styles.title}>
            <Text style={styles.bold}>{moneyFormat(balance, CURRENCIES[selectedToken].dps)}</Text> {CURRENCIES[selectedToken].name} Converted
        </Text>
        <View style={styles.containerCoins}>
            {coins.map(code => (
                <CoinCompare
                    key={code}
                    coin={code}
                    value={getPrice(selectedToken, code, exchange, balance, false)}
                />
            ))}
        </View>
        <Text
            style={styles.label}
            onPress={onOpenURL}>
            Prices by <Text style={[styles.label, styles.underline]}>CryptoCompare</Text>
        </Text>
    </View>
);

export default ConvertBalance;
