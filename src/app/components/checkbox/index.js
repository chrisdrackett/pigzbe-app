import React from 'react';
import {TouchableOpacity, Text, View, Switch} from 'react-native';
import styles from './styles';
import { color } from 'app/styles';

export default ({text, value, onValueChange, alt}) => {
    if (alt) {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>
                    {text}
                </Text>
                <Switch
                    value={value}
                    onValueChange={onValueChange}
                    onTintColor={color.pink}
                />
            </View>
        );
    }

    return (
        <TouchableOpacity style={styles.container} onPress={onValueChange}>
            <Text style={styles.text}>
                {text}
            </Text>
            <View style={styles.checkbox}>
                <View style={styles.outer}>
                    <View style={value ? styles.innerActive : styles.innerInactive} />
                </View>
            </View>
        </TouchableOpacity>
    );
};
