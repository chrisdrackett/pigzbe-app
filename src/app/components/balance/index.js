import React from 'react';
import {connect} from 'react-redux';
import {
    Text,
    TouchableOpacity,
    View,
    Image,
    Dimensions,
    ScrollView
} from 'react-native';
import Avatar from '../avatar';
import styles from './styles';
import {
    strings,
    SCREEN_PROFILE
} from '../../constants';
import ConvertBalance from '../convert-balance';


export const Balance = ({
    balance,
    name,
    image,
    navigation
}) => (
    <ScrollView contentContainerStyle={styles.container}>
        <Image style={styles.logo} source={require('../../../../assets/images/pigzbe_logo_inapp.png')} />
        <Avatar image={image}/>
        <Text style={styles.welcome}>{strings.walletGreeting} {name}</Text>
        <View style={styles.balanceContainer}>
            <Image style={styles.currencyLogo} source={require('../../../../assets/images/currency_logo.png')} />
            <Text style={styles.balance}>{Number(balance).toFixed(2)}</Text>
        </View>

        <Text style={styles.label}>{strings.walletBalance}</Text>
        <Image style={styles.pig} source={require('../../../../assets/images/pig.png')} />
        <Image style={{
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').width * 0.39
        }} source={require('../../../../assets/images/graph.png')} />
        <ConvertBalance balance={balance}/>
        <TouchableOpacity
            style={styles.settings}
            onPress={() => navigation.navigate(SCREEN_PROFILE)}
        >
            <Image style={styles.settingsIcon} source={require('../../../../assets/images/settings-icon.png')} />
        </TouchableOpacity>
    </ScrollView>
);

export default connect(
    state => ({
        balance: state.wollo.balance,
        name: state.profile.name,
        image: state.profile.image
    })
)(Balance);
