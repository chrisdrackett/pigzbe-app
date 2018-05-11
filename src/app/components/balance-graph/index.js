import React from 'react';
import {View, Text} from 'react-native';
import styles from './styles';
import CoinIcon from '../coin-icon';
import moneyFormat from '../../utils/money-format';
import {ASSET_CODE, ASSET_NAME, COIN_SYMBOLS, COIN_DPS} from '../../constants';

const Graph = ({balance, balanceConvert, baseCurrency}) => (
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
                <Text style={styles.balanceConvert}>{COIN_SYMBOLS[baseCurrency]}{moneyFormat(balanceConvert, COIN_DPS[baseCurrency])}</Text>
                {/* <View style={styles.percentage}>
                    <Text style={styles.valuePercentage}>12.41%</Text>
                </View> */}
            </View>
        </View>
    </View>
);

export default Graph;
