import React from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import styles from './styles';

export default ({}) => (
    <View style={styles.wrapper}>
        <TouchableOpacity
            onPress={() => {}}
            style={{}}
        >
            <Image style={styles.image} source={require('../step-header/images/keys.png')} />
            <Text style={styles.text}>CONNECT DEVICE</Text>
        </TouchableOpacity>
    </View>
);
