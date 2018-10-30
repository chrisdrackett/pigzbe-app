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
    textStyle,
    error,
}) => (
    <View style={styles.container}>
        <TouchableOpacity
            onPress={() => disabled ? false : onPress()}
            disabled={disabled}
            style={[
                styles.hit,
                styles[`hit__${theme}`],
                disabled ? [styles.hit__disabled, styles[`hit__disabled__${theme}`]] : null,
                style,
                error ? styles.error : null
            ]}
        >
            <Text
                style={[
                    styles.text,
                    styles[`text__${theme}`],
                    disabled ? [styles.text__disabled, styles[`text__disabled__${theme}`]] : null,
                    textStyle,
                    error ? styles.error : null
                ]}
            >
                {label}
            </Text>
        </TouchableOpacity>
    </View>
);
