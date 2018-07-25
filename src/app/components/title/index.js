import React from 'react';
import {Text} from 'react-native';
import styles from './styles';

export default ({children, dark, style}) => (
    <Text style={dark ? [styles.title, styles.dark, style] : [styles.title, style]}>
        {children}
    </Text>
);
