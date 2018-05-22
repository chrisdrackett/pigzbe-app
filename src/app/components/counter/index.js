import React from 'react';
import {Text, TouchableOpacity, Image} from 'react-native';
import styles from './styles';

export default ({
    value,
    onPress
}) => (
    <TouchableOpacity
        style={styles.container}
        onPress={onPress}
    >
        <Image style={styles.wollo} source={require('./images/wollo.png')} />
        <Image style={styles.times} source={require('./images/times.png')} />
        <Text style={styles.text}>{value < 10 ? `0${value}` : value}</Text>
    </TouchableOpacity>
);
