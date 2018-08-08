import React from 'react';
import {View, Text} from 'react-native';
import styles from './styles';
import CoinIcon from '../coin-icon';
import moneyFormat from '../../utils/money-format';
import {ASSET_CODE, ASSET_NAME, COIN_SYMBOLS, COIN_DPS} from '../../constants';

const Graph = ({balance, balanceXLM, exchange, baseCurrency}) => (
    <View style={styles.container}>
        {/* <Image style={styles.graph} source={require('./images/graph.png')} /> */}
        <View style={styles.wrapperBalance}>
            <View style={styles.containerBalance}>
                <CoinIcon coin={ASSET_CODE} style={styles.coin}/>
                <View>
                    <Text style={styles.coinName}>{ASSET_NAME}</Text>
                    <Text style={styles.value}>{moneyFormat(balance, COIN_DPS[ASSET_CODE])}</Text>
                </View>
            </View>
            <View style={styles.balanceTotal}>
                {exchange ? (
                    <Text style={styles.balanceConvert}>{COIN_SYMBOLS[baseCurrency]}
                        {moneyFormat(balance * exchange[baseCurrency], COIN_DPS[baseCurrency])}
                    </Text>
                ) : null}
            </View>
        </View>
        <View style={styles.wrapperBalance}>
            <View style={styles.containerBalance}>
                <CoinIcon coin={'XLM'} style={styles.coin}/>
                <View>
                    <Text style={styles.coinName}>{'XLM'}</Text>
                    <Text style={styles.value}>{moneyFormat(balanceXLM, COIN_DPS.XLM)}</Text>
                </View>
            </View>
            <View style={styles.balanceTotal}>
                {/* {exchange ? (
                    <Text style={styles.balanceConvert}>{COIN_SYMBOLS[baseCurrency]}
                        {moneyFormat(balance * exchange[baseCurrency], COIN_DPS[baseCurrency])}
                    </Text>
                ) : null} */}
            </View>
        </View>
    </View>
);

export default Graph;
