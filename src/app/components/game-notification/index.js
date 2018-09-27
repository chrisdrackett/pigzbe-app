import React from 'react';
import {View, Image, Text} from 'react-native';
import styles from './styles';
import GameWollo from '../game-wollo';

export default ({amount, text}) => (
    <View style={styles.wrapper}>
        <Image style={styles.cloud} source={require('./images/cloud.png')} />
        <View style={styles.amount}>
            <GameWollo small value={amount} />
        </View>
        <Text style={styles.text}>{text}</Text>
    </View>
);
