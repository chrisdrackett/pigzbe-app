import React from 'react';
import {Image, View} from 'react-native';
import styles from './styles';

export default () => (
    <View style={styles.container}>
        <Image style={styles.pig} source={require('./pig.png')} />
    </View>
);
