import React from 'react';
import {View, Text} from 'react-native';
import styles from '../styles';

const bold = text => {
    text = text.split('*');
    for (let i = 1; i < text.length; i += 2) {
        const word = text[i].replace(/[*]/g, '');
        text[i] = <Text key={i} style={{fontWeight: 'bold'}}>{word}</Text>;
    }
    return text;
};

export default ({items}) => (
    <View style={styles.list}>
        {items.map((item, i) => (
            <View style={styles.listItem} key={i}>
                <Text style={[styles.text, styles.num]}>{String(i + 1)}.</Text>
                <Text style={styles.text}>
                    {bold(item)}
                </Text>
            </View>
        ))}
    </View>
);
