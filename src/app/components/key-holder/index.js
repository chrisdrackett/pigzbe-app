import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';

export default ({title, content, onPress}) => (
    <TouchableOpacity
        onPress={onPress}>
        <View style={styles.box}>
            <Text style={styles.content}>
                <Text style={styles.normal}>{title}</Text> {content}
            </Text>
        </View>
    </TouchableOpacity>
);
