import React from 'react';
import {
    Text,
    View,
    Image
} from 'react-native';
import styles from './styles';
import {strings, ASSET_DPS} from '../../constants';
import moneyFormat from '../../utils/money-format';

export default ({balance}) => (
    <View style={styles.wolloContainer}>
        <View style={styles.balanceContainer}>
            <Image style={styles.currencyLogo} source={require('./images/currency_logo.png')} />
            <Text style={styles.balance}>{moneyFormat(balance, ASSET_DPS)}</Text>
        </View>
        <Text style={styles.label}>{strings.walletBalance}</Text>
    </View>
);
