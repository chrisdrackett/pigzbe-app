import React from 'react';
import {Image, TouchableOpacity, View, Text} from 'react-native';
import Logo from '../logo';
import styles from './styles';

export default ({onSettings, onBack, hideLogo, customTitle}) => (
    <View style={styles.container}>
        {!hideLogo && !customTitle && <Logo />}
        {
            customTitle ? <Text style={styles.customTitle}>{customTitle}</Text> : null
        }
        {onSettings &&
            <TouchableOpacity style={styles.settings} onPress={onSettings}>
                <Image style={styles.settingsIcon} source={require('./images/settings-icon.png')} />
            </TouchableOpacity>
        }
        {onBack && (
            <TouchableOpacity style={styles.back} onPress={onBack}>
                <Image style={styles.backIcon} source={require('./images/btn_back.png')}/>
            </TouchableOpacity>
        )}
    </View>
);
