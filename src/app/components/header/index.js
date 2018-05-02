import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import Logo from '../logo';
import {SCREEN_PROFILE} from '../../constants';
import styles from './styles';

const Header = ({showSettings, navigation}) => (
    <View style={styles.container}>
        <Logo />
        {showSettings &&
            <TouchableOpacity style={styles.settings} onPress={() => navigation.navigate(SCREEN_PROFILE)}>
                <Image style={styles.settingsIcon} source={require('./images/settings-icon.png')} />
            </TouchableOpacity>
        }
    </View>
);

export default Header;
