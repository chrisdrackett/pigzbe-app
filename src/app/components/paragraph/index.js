import React from 'react';
import {Text} from 'react-native';
import styles from './styles';

const bold = text => {
    text = text.split('*');
    for (let i = 1; i < text.length; i += 2) {
        const word = text[i].replace(/[*]/g, '');
        text[i] = <Text key={i} style={{fontWeight: 'bold'}}>{word}</Text>;
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

export default ({size = 16, children, style}) => (
    <Text style={[styles.paragraph, {fontSize: size}, style]}>
        {format(children)}
    </Text>
);
