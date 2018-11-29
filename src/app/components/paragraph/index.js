import React from 'react';
import {Text} from 'react-native';
import styles from './styles';

const bold = text => {
    text = text.split('*');
    for (let i = 1; i < text.length; i += 2) {
        const word = text[i].replace(/[*]/g, '');
        text[i] = <Text key={`b${i}`} style={styles.bold}>{word}</Text>;
    }
    return text;
};

const format = children => {
    if (typeof children === 'string') {
        return bold(children);
    }
    if (typeof children === 'object' && Array.isArray(children)) {
        return children.map(child => format(child));
    }
    return children;
};

export default ({small, children, style, error}) => (
    <Text style={[
        styles.paragraph,
        small ? styles.small : null,
        error ? styles.error : null,
        style
    ]}>
        {format(children)}
    </Text>
);
