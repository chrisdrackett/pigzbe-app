import React from 'react';
import {Text, View} from 'react-native';
import styles from './styles';
import {CURRENCIES, ASSET_CODE} from 'app/constants';
import moneyFormat from 'app/utils/money-format';
import AmountExchange from '../amount-exchange';
import Icon from '../icon';
import CoinIcon from '../coin-icon';

export default ({balance, exchange, baseCurrency, dark, style, label, small, link, selectedToken = ASSET_CODE}) => (
    <View style={[styles.wolloContainer, style]}>
        <View style={styles.balanceContainer}>
            <CoinIcon coin={selectedToken} style={styles.currencyLogo} small light={!dark} />
            <Text style={[
                styles.balance,
                dark ? styles.balance__dark : null,
                small ? styles.balance__small : null
            ]}>
                {moneyFormat(balance, CURRENCIES[selectedToken].dps)}
            </Text>

            {!!link &&
                <Icon name="chevron" style={styles.icon}/>
            }
        </View>
        {(baseCurrency && exchange) && (
            <AmountExchange
                style={[styles.label, dark ? styles.label__dark : null]}
                amount={balance}
                exchange={exchange}
                baseCurrency={baseCurrency}
                selectedToken={selectedToken}
            />
        )}
        {label && (
            <Text style={[styles.label, dark ? styles.label__dark : null]}>
                {label}
            </Text>
        )}
    </View>
);
