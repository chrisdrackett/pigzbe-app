import React from 'react';
import {Text, View} from 'react-native';
import styles from './styles';
import Button from '../button';

export default ({
    navigation
}) => (
    <View style={styles.container}>
        <Text style={styles.title}>Privacy</Text>
        <Text>Lorem ipsum dolor sit amet</Text>
        <Button
            label="Back"
            plain
            onPress={() => navigation.navigate('Profile')}
        />
    </View>
);
