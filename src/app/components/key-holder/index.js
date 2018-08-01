import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';

const splitKey = (key, txHash) => {
    if (txHash) {
        return `${key.slice(0, 12)} ${key.slice(12, 40)} ${key.slice(40)}`;
    }
    return `${key.slice(0, 13)} ${key.slice(13, 35)} ${key.slice(35)}`;
};

export default ({title, content, onPress, style}) => {
    // console.log(content);
    // console.log(splitKey(content));
    // console.log(content.length);
    const txHash = content.length > 56;
    return (
        <TouchableOpacity
            onPress={onPress}>
            <View style={[styles.box, style]}>
                <Text style={[styles.content, txHash ? styles.txHash : null]}>
                    {title} <Text style={styles.bold}>{splitKey(content, txHash)}</Text>
                </Text>
            </View>
        </TouchableOpacity>
    );
};
