import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import styles from '../styles';

export default ({title, content, onPress}) => (
    <TouchableOpacity
        onPress={onPress}>
        <View style={styles.boxKeys}>
            <Text style={styles.boxKeysTitle}>{title}</Text>
            <View style={styles.boxKeysInner}>
                <Text style={styles.boxKeysText}>{content}</Text>
                <Image style={styles.boxKeysCopy} source={require('./images/copy.png')}/>
            </View>
        </View>
    </TouchableOpacity>
);
