import React from 'react';
import {connect} from 'react-redux';
import {
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import Avatar from '../avatar';
import styles from './styles';
import {
    strings,
    SCREEN_PROFILE
} from '../../constants';
import openURL from '../../utils/open-url';

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
        <Text style={styles.welcome}>{strings.walletGreeting} {name}</Text>
        <Text style={styles.balance}>
            {balance}
        </Text>
        <Text style={styles.label}>{strings.walletBalance}</Text>
        <Text style={styles.label}>{strings.walletConversionTitle}</Text>
        <Text
            style={styles.label}
            onPress={() => openURL(strings.walletConversionCreditUrl)}>
            {strings.walletConversionCreditLabel}
        </Text>
        <TouchableOpacity
            style={styles.settings}
            onPress={() => navigation.navigate(SCREEN_PROFILE)}
        />
    </View>
));
