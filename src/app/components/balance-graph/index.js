import React from 'react';
import {View, Text, Image} from 'react-native';
import styles from './styles';

const Graph = ({balance, balanceConvert}) => (
    <View style={styles.container}>
        <Image style={styles.graph} source={require('../../../../assets/images/graph.png')} />
        <View style={styles.wrapperBalance}>
            <View style={styles.containerBalance}>
                <Image style={styles.coin} source={require('../../../../assets/images/coin-wollo.png')} />
                <View>
                    <Text style={styles.coinName}>Wollo</Text>
                    <Text style={styles.value}>{Number(balance).toFixed(2)}</Text>
                </View>

            </View>
            <View style={styles.balanceTotal}>
                <Text style={styles.balanceConvert}>${Number(balanceConvert).toFixed(2)}</Text>
                <View style={styles.percentage}>
                    <Text style={styles.value}>12.41%</Text>
                </View>
            </View>
        </View>
    </View>
);

export default Graph;
