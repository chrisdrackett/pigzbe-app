import React from 'react';
import {
    Text,
    TouchableOpacity
} from 'react-native';
import styles from './styles';

const getButtonStyle = (plain, disabled) => {
    if (plain) {
        return [styles.button, styles.buttonPlain];
    }

    if (disabled) {
        return [styles.button, styles.buttonDisabled];
    }

    return styles.button;
};

export default ({
    label,
    onPress,
    plain,
    disabled
}) => (
    <TouchableOpacity
        style={plain ? null : styles.buttonHit}
        onPress={() => onPress()}>
        <Text
            style={getButtonStyle(plain, disabled)}>
            {label}
        </Text>
    </TouchableOpacity>
);
