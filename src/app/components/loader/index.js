import React from 'react';
import {
    ActivityIndicator,
    Text,
    View
} from 'react-native';
import styles from './styles';
import {color} from '../../styles';

const getViewStyle = (transparent, light) => {
    if (transparent) {
        return [styles.loader, styles.transparent];
    }

    if (light) {
        return [styles.loader, styles.light];
    }

    return styles.loader;
};

const getTextStyle = light => {
    if (light) {
        return [styles.message, styles.messageLight];
    }

    return styles.message;
};

export default ({
    isLoading,
    message,
    transparent,
    light
}) => {
    if (isLoading) {
        return (
            <View style={getViewStyle(transparent, light)}>
                <ActivityIndicator size="large" color={light ? color.blue : color.pink} />
                {message ? (
                    <Text style={getTextStyle(light)}>{message}</Text>
                ) : null}
            </View>
        );
    }
    return null;
};
