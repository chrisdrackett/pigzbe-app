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

export default ({children, style}) => (
    <Text style={[styles.paragraph, style]}>
        {bold(children)}
    </Text>
);
