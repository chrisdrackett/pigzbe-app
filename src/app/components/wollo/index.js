import React from 'react';
import {
    Text,
    View,
    Image
} from 'react-native';
import styles from './styles';
import {ASSET_DPS} from '../../constants';
import moneyFormat from '../../utils/money-format';
import AmountExchange from '../amount-exchange';

export default ({balance, exchange, baseCurrency, dark, style, label, small}) => (
    <View style={[styles.wolloContainer, style]}>
        <View style={styles.balanceContainer}>
            <Image
                style={styles.currencyLogo}
                source={dark ? require('./images/wollo_dark.png') : require('./images/wollo.png')}
            />
            <Text style={[
                styles.balance,
                dark ? styles.balance__dark : null,
                small ? styles.balance__small : null
            ]}>
                {moneyFormat(balance, ASSET_DPS)}
            </Text>
        </View>
        {exchange && (
            <AmountExchange
                style={[styles.label, dark ? styles.label__dark : null]}
                amount={balance}
                exchange={exchange}
                baseCurrency={baseCurrency}
            />
        )}
        {label && (
            <Text style={[styles.label, dark ? styles.label__dark : null]}>
                {label}
            </Text>
        )}
    </View>
);
