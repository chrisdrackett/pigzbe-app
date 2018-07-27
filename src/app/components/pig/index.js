import React from 'react';
import {Image, View} from 'react-native';
import styles from './styles';

export default ({style}) => (
    <View style={style || styles.container}>
        <Image style={styles.pig} source={require('./piggy.png')} />
    </View>
);
