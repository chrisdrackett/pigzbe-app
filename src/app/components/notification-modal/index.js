import React from 'react';
import {View, Image, Text, Modal} from 'react-native';
import styles from './styles';
import Button from '../button';

const types = {
    success: {
        title: 'Success!',
        icon: require('./images/success.png'),
    },
    warning: {
        title: 'Warning!',
        icon: require('./images/warning.png'),
    },
    error: {
        title: 'Failure!',
        icon: require('./images/error.png'),
    },
};

export default ({
    type = 'success',
    open,
    title,
    text,
    onRequestClose,
    buttonLabel = 'Got it!',
    hideButton,
    onButtonPress = null
}) => (
    <Modal
        transparent={true}
        visible={open}
        onRequestClose={onRequestClose}
    >
        <View style={styles.overlay}>
            <View style={styles.container}>
                <View style={styles.iconContainer}>
                    <Image source={types[type].icon} style={styles.icon} />
                </View>
                <Text style={styles.title}>{title || types[type].title}</Text>
                <Text style={styles.text}>{text}</Text>
                {!hideButton &&
                    <Button
                        label={buttonLabel}
                        onPress={onButtonPress ? onButtonPress : onRequestClose}
                        style={styles.button}
                    />
                }
            </View>
        </View>
    </Modal>
);
