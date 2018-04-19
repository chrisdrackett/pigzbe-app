import React from 'react';
import {Text, View} from 'react-native';
import styles from './styles';
import Button from '../button';

export default ({
    navigation
}) => (
    <View style={styles.container}>
        <Text style={styles.title}>Help</Text>
        <Text style={styles.text}>Lorem ipsum dolor sit amet</Text>
        <Button
            label="Back"
            plain
            onPress={() => navigation.navigate('Login')}
        />
    </View>
);