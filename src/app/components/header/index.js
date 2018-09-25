import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import Logo from '../logo';
import Icon from '../icon';
import styles from './styles';

export default ({
    onBack,
    onSettings,
    settingsIcon = 'settings',
    hideLogo,
    customTitle,
}) => (
    <View style={styles.container}>
        <View style={styles.iconContainer}>
            {onBack && (
                <TouchableOpacity style={styles.back} onPress={onBack}>
                    <Icon style={styles.backIcon} name="back" />
                </TouchableOpacity>
            )}
        </View>
        <View style={styles.titleContainer}>
            {!hideLogo && !customTitle && <Logo />}
            {
                customTitle ? <Text style={styles.customTitle}>{customTitle}</Text> : null
            }
        </View>
        <View style={styles.iconContainer}>
            {onSettings &&
                <TouchableOpacity style={styles.settings} onPress={onSettings}>
                    <Icon style={styles.settingsIcon} name={settingsIcon} />
                </TouchableOpacity>
            }
        </View>
    </View>
);
