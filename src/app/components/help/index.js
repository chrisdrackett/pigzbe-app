import React from 'react';
import {Text, View} from 'react-native';
import styles from './styles';
import Button from '../button';
import {SCREEN_LOGIN} from '../../constants';

export default ({
    navigation
}) => (
    <View style={styles.container}>
        <Text style={styles.title}>Help</Text>
        <Text style={styles.text}>Lorem ipsum dolor sit amet</Text>
        <Button
            label="Back"
            plain
            onPress={() => navigation.navigate(SCREEN_LOGIN)}
        />
    </View>
);
