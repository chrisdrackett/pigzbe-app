import React from 'react';
import {
    Text,
    View,
    Image
} from 'react-native';
import styles from './styles';
import {strings, ASSET_DPS} from '../../constants';
import moneyFormat from '../../utils/money-format';
import AmountExchange from '../amount-exchange';

export default ({balance, exchange, baseCurrency, dark, style}) => (
    <View style={[styles.wolloContainer, style]}>
        <View style={styles.balanceContainer}>
            <Image
                style={styles.currencyLogo}
                source={dark ? require('./images/wollo_dark.png') : require('./images/wollo.png')}
            />
            <Text style={[styles.balance, dark ? styles.balance__dark : null]}>
                {moneyFormat(balance, ASSET_DPS)}
            </Text>
        </View>
        {exchange ? (
            <AmountExchange
                style={[styles.label, dark ? styles.label__dark : null]}
                amount={balance}
                exchange={exchange}
                baseCurrency={baseCurrency}
            />
        ) : (
            <Text style={[styles.label, dark ? styles.label__dark : null]}>
                {strings.walletBalance}
            </Text>
        )}
    </View>
);
