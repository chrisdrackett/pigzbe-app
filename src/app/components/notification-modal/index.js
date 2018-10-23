import React from 'react';
import {View, Image, Text, ActivityIndicator} from 'react-native';
import styles from './styles';
import Button from '../button';
import IconButton from '../icon-button';
import {color} from '../../styles';
import Modal from 'react-native-modal';

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
    onRequestClose = () => {},
    buttonLabel = 'Got it!',
    hideButton,
    onButtonPress = null,
    closeCross,
    onModalHide,
}) => (
    <Modal
        isVisible={open}
        style={{margin: 0}}
        backdropOpacity={0.35}
        backdropColor="rgb(0, 50, 120)"
        onBackButtonPress={onRequestClose}
        onModalHide={onModalHide}
    >
        <View style={styles.overlay}>
            <View style={styles.outerContainer}>
                <View style={styles.container}>
                    <Text style={styles.title}>{title || types[type].title}</Text>
                    <Text style={styles.text}>{text}</Text>
                    {type === 'progress' && (
                        <View style={styles.progress}>
                            <ActivityIndicator size="large" color={color.pink} />
                        </View>
                    )}
                    {!hideButton &&
                        <Button
                            label={buttonLabel}
                            onPress={onButtonPress ? onButtonPress : onRequestClose}
                            style={styles.button}
                        />
                    }
                </View>
                {types[type] && (
                    <View style={styles.iconContainer}>
                        <Image source={types[type].icon} style={styles.icon} />
                    </View>
                )}
                {closeCross && (
                    <IconButton
                        style={{position: 'absolute', top: 32, right: 32}}
                        icon="crossBlue"
                        size={20}
                        padding={16}
                        onPress={onRequestClose}
                    />
                )}
            </View>
        </View>
    </Modal>
);
