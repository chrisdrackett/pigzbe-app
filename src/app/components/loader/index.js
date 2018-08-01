import React from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import styles from './styles';
import {color} from '../../styles';

export default ({
    loading,
    message,
    light,
    style
}) => {
    if (loading) {
        return (
            <View style={[styles.loader, light ? styles.light : null, style]}>
                <ActivityIndicator size="large" color={light ? color.blue : color.pink} />
                {message ? (
                    <Text style={[styles.message, light ? styles.messageLight : null]}>{message}</Text>
                ) : null}
            </View>
        );
    }
    return null;
};
