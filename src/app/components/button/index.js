import React from 'react';
import {
    Text,
    TouchableOpacity
} from 'react-native';
import styles from './styles';

const getButtonHitStyle = (plain, style, outline, secondary = false, disabled = false) => {
    if (plain) {
        return null;
    }

    let s = [styles.buttonHit];

    if (secondary) {
        s = s.concat(styles.buttonHitSecondary);

        if (disabled) {
            s = s.concat(styles.buttonHitSecondaryDisabled);
        }
    }

    if (outline) {
        s = s.concat(styles.buttonHitOutline);

        if (disabled) {
            s = s.concat(styles.buttonHitOutlineDisabled);
        }
    }

    s = s.concat(style);

    return s;
};

const getButtonTextStyle = (plain, disabled, secondary = false, textStyle = {}) => {
    let s = [styles.button];

    if (plain) {
        s = s.concat(styles.buttonPlain);
    }

    if (disabled) {
        s = s.concat(styles.buttonDisabled);
    }

    if (secondary) {
        s = s.concat(styles.buttonTextSecondary);

        if (disabled) {
            s = s.concat(styles.buttonTextSecondaryDisabled);
        }
    }

    s = s.concat(textStyle);

    return s;
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
        style={getButtonHitStyle(plain, style, outline, secondary, disabled)}
        onPress={() => disabled ? false : onPress()}>
        <Text
            style={getButtonTextStyle(plain, disabled, secondary, textStyle)}>
            {label}
        </Text>
    </TouchableOpacity>
);
