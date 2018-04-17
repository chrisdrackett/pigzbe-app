import React from 'react';
import {
    Text,
    TouchableOpacity
} from 'react-native';
import styles from './styles';

export default ({
    label,
    onPress
}) => (
    <TouchableOpacity
        style={styles.buttonHit}
        onPress={() => onPress()}>
        <Text style={styles.button}>{label}</Text>
    </TouchableOpacity>
);
