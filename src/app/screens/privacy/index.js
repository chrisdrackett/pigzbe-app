import React from 'react';
import {Text, View} from 'react-native';
import styles from './styles';
import Button from '../../components/button';
import {SCREEN_PROFILE} from '../../constants';

export default ({
    navigation
}) => (
    <View style={styles.container}>
        <Text style={styles.title}>Privacy</Text>
        <Text style={styles.text}>Lorem ipsum dolor sit amet</Text>
        <Button
            label="Back"
            plain
            onPress={() => navigation.navigate(SCREEN_PROFILE)}
        />
    </View>
);
