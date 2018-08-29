import React from 'react';
import {
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import styles from './styles';

export default ({
    label,
    onPress,
    disabled,
    style,
    innerStyle,
    active,
    textStyle,
}) => (
    <View style={[styles.container, style]}>
        <TouchableOpacity
            onPress={() => disabled ? false : onPress()}
            disabled={disabled}
            style={[
                styles.hit,
                disabled ? styles.hit__disabled : null,
                active ? styles.active : null,
                innerStyle,
            ]}
        >
            <Text
                style={[
                    styles.text,
                    disabled ? styles.text__disabled : null,
                    textStyle
                ]}
            >
                {label}
            </Text>
        </TouchableOpacity>
    </View>
);
