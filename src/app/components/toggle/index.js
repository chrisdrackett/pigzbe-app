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
    theme = '',
    style,
    active,
    textStyle,
}) => (
    <View style={styles.container}>
        <TouchableOpacity
            onPress={() => disabled ? false : onPress()}
            disabled={disabled}
            style={[
                styles.hit,
                styles[`hit__${theme}`],
                disabled ? [styles.hit__disabled, styles[`hit__disabled__${theme}`]] : null,
                active ? styles.active : null,
                style
            ]}
        >
            <Text
                style={[
                    styles.text,
                    styles[`text__${theme}`],
                    disabled ? [styles.text__disabled, styles[`text__disabled__${theme}`]] : null,
                    textStyle
                ]}
            >
                {label}
            </Text>
        </TouchableOpacity>
    </View>
);
