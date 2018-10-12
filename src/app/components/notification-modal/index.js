import React from 'react';
import {View, Image, Text, Modal} from 'react-native';
import styles from './styles';
import Button from '../button';
import IconButton from '../icon-button';

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
    onButtonPress = null,
    closeCross
}) => (
    <Modal
        transparent={true}
        visible={open}
        onRequestClose={onRequestClose}
    >
        <View style={styles.overlay}>
            <View style={styles.outerContainer}>
                <View style={styles.container}>
                    <Text style={styles.title}>{title || types[type].title}</Text>
                    <Text style={styles.text}>{text}</Text>
                    {!hideButton &&
                        <Button
                            label={buttonLabel}
                            onPress={onButtonPress ? onButtonPress : onRequestClose}
                            style={styles.button}
                        />
                    }
                    {closeCross && (
                        <IconButton
                            style={{position: 'absolute', top: 0, right: 0}}
                            icon="crossBlue"
                            size={20}
                            padding={16}
                            onPress={onRequestClose}
                        />
                    )}
                </View>
                <View style={styles.iconContainer}>
                    <Image source={types[type].icon} style={styles.icon} />
                </View>
            </View>
        </View>
    </Modal>
);
