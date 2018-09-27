import React from 'react';
import {View, Text, Image} from 'react-native';
import styles from './styles';

export default ({value, small}) => (
    <View style={[styles.container, small ? styles.container__small : null]}>
        <Image
            style={[styles.wollo, small ? styles.wollo__small : null]}
            source={require('./images/wollo.png')}
        />
        <Image
            style={styles.times}
            source={require('./images/times.png')}
        />
        <Text
            style={[styles.text, small ? styles.text__small : null]}>
            {value < 10 ? `0${value}` : value}
        </Text>
    </View>
);
