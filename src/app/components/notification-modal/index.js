import React from 'react';
import {View, Image, ActivityIndicator} from 'react-native';
import styles from './styles';
import Button from '../button';
import IconButton from '../icon-button';
import Title from '../title';
import Paragraph from '../paragraph';
import {color} from 'app/styles';
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
    progress: {
        title: 'In progress',
        icon: null,
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
    buttonLabelB = null,
    onButtonPressB = null,
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
                    <Title dark>{title || types[type].title}</Title>
                    {typeof text === 'string' && (
                        <Paragraph style={styles.text}>{text}</Paragraph>
                    )}
                    {Array.isArray(text) && (
                        text.map(t => (<Paragraph key={t} style={styles.text}>{t}</Paragraph>))
                    )}
                    {type === 'progress' && (
                        <View style={styles.progress}>
                            <ActivityIndicator size="large" color={color.pink} />
                        </View>
                    )}
                    {!hideButton &&
                        <View style={styles.buttons}>
                            <Button
                                theme={buttonLabelB && onButtonPressB ? 'outline' : null}
                                label={buttonLabel}
                                onPress={onButtonPress ? onButtonPress : onRequestClose}
                                style={[styles.button, buttonLabelB && onButtonPressB ? styles.buttonSmall : null]}
                                textStyle={buttonLabelB && onButtonPressB ? styles.buttonSmallText : null}
                            />
                            {buttonLabelB && onButtonPressB && (
                                <Button
                                    label={buttonLabelB}
                                    onPress={onButtonPressB}
                                    style={[styles.button, styles.buttonSmall, styles.buttonB]}
                                    textStyle={styles.buttonSmallText}
                                />
                            )}
                        </View>
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
