import React from 'react';
import {
    Text,
    View,
    Image
} from 'react-native';
import styles from './styles';
import {CURRENCIES, ASSET_CODE} from '../../constants';
import moneyFormat from '../../utils/money-format';
import AmountExchange from '../amount-exchange';
import Icon from '../icon';

export default ({balance, exchange, baseCurrency, dark, style, label, small, link, selectedToken = ASSET_CODE}) => (
    <View style={[styles.wolloContainer, style]}>
        <View style={styles.balanceContainer}>
            {selectedToken === ASSET_CODE ? (
                <Image
                    style={styles.currencyLogo}
                    source={dark ? require('./images/wollo_dark.png') : require('./images/wollo.png')}
                />
            ) : (
                <Image
                    style={styles.currencyLogo}
                    source={require('../token-selector/images/xlm.png')}
                />
            )}
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
