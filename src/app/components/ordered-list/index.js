import React from 'react';
import {View, Text} from 'react-native';
import Paragraph from '../paragraph';
import styles from './styles';

export default ({items}) => (
    <View>
        {items.map((item, i) => (
            <View style={styles.listItem} key={i}>
                <Text style={[styles.text, styles.num]}>{String(i + 1)}.</Text>
                <Paragraph style={styles.text}>{item}</Paragraph>
            </View>
        ))}
    </View>
);
