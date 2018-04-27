import React from 'react';
import {View} from 'react-native';
import styles from './styles';

const Checkbox = ({value, onValueChange}) => (
    <View style={styles.container} onClick={onValueChange}>
        <View style={styles.outer}>
            <View style={value ? styles.innerActive : styles.innerInactive} />
        </View>
    </View>
);

export default Checkbox;
