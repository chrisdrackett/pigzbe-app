import React from 'react';
import {connect} from 'react-redux';
import {Text, View} from 'react-native';
import Button from '../button';
import styles from './styles';

export default connect(
    state => ({
        balance: state.wollo.balance,
        publicKey: state.auth.publicKey,
        name: state.profile.name
    })
)(({
    balance,
    name,
    navigation
}) => (
    <View style={styles.container}>
        <Text style={styles.welcome}>Hi {name}</Text>
        <Text style={styles.balance}>
            {balance.length ? balance : 'Loading...'}
        </Text>
        <Text style={styles.label}>Wollo balance</Text>
        <Button
            label="Go to Profile"
            onPress={() => navigation.navigate('Profile')}
        />
    </View>
));
