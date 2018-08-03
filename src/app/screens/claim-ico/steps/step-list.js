import React from 'react';
import {View, Text} from 'react-native';
import styles from '../styles';
import Paragraph from '../../../components/paragraph';

export default ({items}) => (
    <View style={styles.list}>
        {items.map((item, i) => (
            <View style={styles.listItem} key={i}>
                <Text style={[styles.text, styles.num]}>{String(i + 1)}.</Text>
                <Paragraph style={styles.text}>{item}</Paragraph>
            </View>
        ))}
    </View>
);
