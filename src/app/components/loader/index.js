import React from 'react';
import {
    ActivityIndicator,
    Text,
    View
} from 'react-native';
import styles from './styles';
import {color} from '../../styles';

const getViewStyle = (transparent, light, white) => {
    if (transparent) {
        return [styles.loader, styles.transparent];
    }

    if (light) {
        return [styles.loader, styles.light];
    }

    if (white) {
        return [styles.loader, styles.white];
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
    white,
    light
}) => {
    if (isLoading) {
        return (
            <View style={getViewStyle(transparent, light, white)}>
                <ActivityIndicator size="large" color={(light || white) ? color.blue : color.pink} />
                {message ? (
                    <Text style={getTextStyle(light)}>{message}</Text>
                ) : null}
            </View>
        );
    }
    return null;
};
