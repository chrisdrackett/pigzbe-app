import React from 'react';
import {
    Text,
    View,
    Image
} from 'react-native';
import styles from './styles';
import {
    strings,
    COIN_DPS,
    ASSET_CODE
} from '../../constants';
import moneyFormat from '../../utils/money-format';

export default ({balance}) => (
    <View style={styles.wolloContainer}>
        <View style={styles.balanceContainer}>
            <Image style={styles.currencyLogo} source={require('./images/currency_logo.png')} />
            <Text style={styles.balance}>{moneyFormat(balance, COIN_DPS[ASSET_CODE])}</Text>
        </View>
        <Text style={styles.label}>{strings.walletBalance}</Text>
    </View>
);
