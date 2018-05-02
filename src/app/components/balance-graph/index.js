import React from 'react';
import {View, Text} from 'react-native';
import styles from './styles';
import CoinIcon from '../coin-icon';

const Graph = ({balance, balanceConvert}) => (
    <View style={styles.container}>
        {/* <Image style={styles.graph} source={require('./images/graph.png')} /> */}
        <View style={styles.wrapperBalance}>
            <View style={styles.containerBalance}>
                <CoinIcon coin="WLO" style={styles.coin}/>
                <View>
                    <Text style={styles.coinName}>Wollo</Text>
                    <Text style={styles.value}>{Number(balance).toFixed(2)}</Text>
                </View>

            </View>
            <View style={styles.balanceTotal}>
                <Text style={styles.balanceConvert}>${Number(balanceConvert).toFixed(2)}</Text>
                {/* <View style={styles.percentage}>
                    <Text style={styles.valuePercentage}>12.41%</Text>
                </View> */}
            </View>
        </View>
    </View>
);

export default Graph;
