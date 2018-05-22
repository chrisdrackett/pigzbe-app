import React from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import styles from './styles';

const Checkbox = ({text, value, onValueChange}) => (
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

export default Checkbox;
