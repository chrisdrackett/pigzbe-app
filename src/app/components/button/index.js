import React from 'react';
import {
    Text,
    TouchableOpacity
} from 'react-native';
import styles from './styles';

const getButtonHitStyle = (plain, style, outline, secondary = false) => {
    if (plain) {
        return null;
    }

    if (secondary) {
        return [styles.buttonHit, styles.buttonHitSecondary, style];
    }

    if (outline) {
        return [styles.buttonHit, styles.buttonHitOutline, style];
    }

    return [styles.buttonHit, style];
};

const getButtonTextStyle = (plain, disabled, secondary = false, textStyle = {}) => {
    if (plain) {
        return [styles.button, styles.buttonPlain, textStyle];
    }

    if (disabled) {
        return [styles.button, styles.buttonDisabled, textStyle];
    }

    const style = secondary ? [styles.buttonTextSecondary, textStyle] : textStyle;

    return [styles.button, style];
};

export default ({
    label,
    onPress,
    plain,
    disabled,
    style,
    textStyle,
    outline,
    secondary
}) => (
    <TouchableOpacity
        disabled={disabled}
        style={getButtonHitStyle(plain, style, outline, secondary)}
        onPress={() => disabled ? false : onPress()}>
        <Text
            style={getButtonTextStyle(plain, disabled, secondary, textStyle)}>
            {label}
        </Text>
    </TouchableOpacity>
);
