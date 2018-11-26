import React from 'react';
import {View, Text} from 'react-native';
import styles from './styles';
import CoinIcon from '../coin-icon';
import AmountExchange from '../amount-exchange';
import {ASSET_CODE, CURRENCIES} from '../../constants';
import getPrice from 'app/utils/get-price';

const Graph = ({balance, exchange, baseCurrency, selectedToken = ASSET_CODE}) => (
    <View style={styles.container}>
        <View style={styles.wrapperBalance}>
            <View style={styles.containerBalance}>
                <CoinIcon coin={selectedToken} style={styles.coin}/>
                <View>
                    <Text style={styles.coinName}>{CURRENCIES[selectedToken].name}</Text>
                    <Text style={styles.value}>
                        {getPrice(selectedToken, baseCurrency, exchange)}
                    </Text>
                </View>
            </View>
            <View style={styles.balanceTotal}>
                {exchange ? (
                    <AmountExchange
                        style={styles.balanceConvert}
                        amount={balance}
                        exchange={exchange}
                        baseCurrency={baseCurrency}
                        selectedToken={selectedToken}
                    />
                ) : null}
            </View>
        </View>
    </View>
);

export default Graph;
