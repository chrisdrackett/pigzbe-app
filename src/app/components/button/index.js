import React from 'react';
import {
    Text,
    TouchableOpacity
} from 'react-native';
import styles from './styles';

const getButtonHitStyle = (plain, style) => {
    if (plain) {
        return null;
    }

    return [styles.buttonHit, style];
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
    textStyle
}) => (
    <TouchableOpacity
        disabled={disabled}
        style={getButtonHitStyle(plain, style)}
        onPress={() => disabled ? false : onPress()}>
        <Text
            style={getButtonTextStyle(plain, disabled, textStyle)}>
            {label}
        </Text>
    </TouchableOpacity>
);
