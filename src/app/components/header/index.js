import React from 'react';
import {View, Text} from 'react-native';
import Logo from '../logo';
import IconButton from '../icon-button';
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
                <IconButton
                    icon="back"
                    size={14}
                    padding={16}
                    onPress={onBack}
                />
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
                <IconButton
                    icon={settingsIcon}
                    size={18}
                    padding={12}
                    onPress={onSettings}
                />
            }
        </View>
    </View>
);
