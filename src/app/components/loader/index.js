import React from 'react';
import {
    ActivityIndicator,
    Text,
    View
} from 'react-native';
import styles from './styles';
import {color} from '../../styles';

export default ({
    isLoading,
    message,
    transparent
}) => {
    if (isLoading) {
        return (
            <View style={transparent ? [styles.loader, styles.transparent] : styles.loader}>
                {message ? (
                    <Text style={styles.message}>{message}</Text>
                ) : null}
                <ActivityIndicator size="large" color={color.pink} />
            </View>
        );
    }
    return null;
};
