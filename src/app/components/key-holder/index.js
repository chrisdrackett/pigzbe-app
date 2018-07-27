import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';

const splitKey = key => `${key.slice(0, 15)} ${key.slice(15, 38)} ${key.slice(38)}`;

export default ({title, content, onPress, style}) => {
    // console.log(content);
    // console.log(splitKey(content));
    return (
        <TouchableOpacity
            onPress={onPress}>
            <View style={[styles.box, style]}>
                <Text style={styles.content}>
                    {title} <Text style={styles.bold}>{splitKey(content)}</Text>
                </Text>
            </View>
        </TouchableOpacity>
    );
};
