import React from 'react';
import {connect} from 'react-redux';
import {
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import Avatar from '../avatar';
import styles from './styles';
import {SCREEN_PROFILE} from '../../constants';

export default connect(
    state => ({
        balance: state.wollo.balance,
        publicKey: state.auth.publicKey,
        name: state.profile.name,
        image: state.profile.image
    })
)(({
    balance,
    name,
    image,
    navigation
}) => (
    <View style={styles.container}>
        <Avatar image={image}/>
        <Text style={styles.welcome}>Hi {name}</Text>
        <Text style={styles.balance}>
            {balance.length ? balance : 'Loading...'}
        </Text>
        <Text style={styles.label}>Wollo balance</Text>
        <TouchableOpacity
            style={styles.settings}
            onPress={() => navigation.navigate(SCREEN_PROFILE)}
        />
    </View>
));
