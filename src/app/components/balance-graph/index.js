import React from 'react';
import {View, Text} from 'react-native';
import styles from './styles';
import CoinIcon from '../coin-icon';
import AmountExchange from '../amount-exchange';
import moneyFormat from '../../utils/money-format';
import {ASSET_CODE, ASSET_NAME, CURRENCIES} from '../../constants';

const Graph = ({balance, balanceXLM, exchange, baseCurrency}) => (
    <View style={styles.container}>
        {/* <Image style={styles.graph} source={require('./images/graph.png')} /> */}
        <View style={styles.wrapperBalance}>
            <View style={styles.containerBalance}>
                <CoinIcon coin={ASSET_CODE} style={styles.coin}/>
                <View>
                    <Text style={styles.coinName}>{ASSET_NAME}</Text>
                    <Text style={styles.value}>{moneyFormat(balance, CURRENCIES[ASSET_CODE].dps)}</Text>
                </View>
            </View>
            <View style={styles.balanceTotal}>
                {exchange ? (
                    <AmountExchange
                        style={styles.balanceConvert}
                        amount={balance}
                        exchange={exchange}
                        baseCurrency={baseCurrency}
                    />
                ) : null}
            </View>
        </View>
        {balanceXLM && (
            <View style={styles.wrapperBalance}>
                <View style={styles.containerBalance}>
                    <CoinIcon coin={'XLM'} style={styles.coin}/>
                    <View>
                        <Text style={styles.coinName}>{'XLM'}</Text>
                        <Text style={styles.value}>{moneyFormat(balanceXLM, CURRENCIES.XLM.dps)}</Text>
                    </View>
                </View>
            </View>
        )}
    </View>
);

export default Graph;
