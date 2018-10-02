import React from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import GameWollo from '../game-wollo';

export default ({amount, memo, hash, onClaim}) => (
    <TouchableOpacity onPress={() => onClaim(hash, amount)}>
        <View style={styles.wrapper}>
            <Image style={styles.cloud} source={require('./images/cloud.png')} />
            <View style={styles.amount}>
                <GameWollo small value={amount} />
            </View>
            <Text style={styles.text}>{memo}</Text>
        </View>
    </TouchableOpacity>
);
