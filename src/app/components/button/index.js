import React from 'react';
import {
    Text,
    TouchableOpacity
} from 'react-native';
import styles from './styles';

const getButtonHitStyle = (plain, style, outline) => {
    if (plain) {
        return null;
    }

    return outline ? [styles.buttonHit, styles.buttonHitOutline, style] : [styles.buttonHit, style];
};

const getButtonTextStyle = (plain, disabled, textStyle) => {
    if (plain) {
        return [styles.button, styles.buttonPlain, textStyle];
    }

    if (disabled) {
        return [styles.button, styles.buttonDisabled, textStyle];
    }

    return [styles.button, textStyle];
};

export default ({
    label,
    onPress,
    plain,
    disabled,
    style,
    textStyle,
    outline
}) => (
    <TouchableOpacity
        disabled={disabled}
        style={getButtonHitStyle(plain, style, outline)}
        onPress={() => disabled ? false : onPress()}>
        <Text
            style={getButtonTextStyle(plain, disabled, textStyle)}>
            {label}
        </Text>
    </TouchableOpacity>
);
