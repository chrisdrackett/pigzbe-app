import React, {Fragment} from 'react';
import {View, Text} from 'react-native';
import Modal from 'react-native-modal';
import StepModule from 'app/components/step-module';
import Paragraph from 'app/components/paragraph';
import Button from '../button';
import styles from './styles';
import {color} from '../../styles';

export default ({
    visible,
    message,
    estimatedCost,
    onConfirm,
    onCancel
}) => (
    <Modal 
        isVisible={visible}
        style={{margin: 0}}
        onBackButtonPress={onCancel}
        animationIn="slideInRight"
        animationOut="slideOutRight"
    >
        <StepModule
            onBack={onCancel}
            plain
            pad
            icon="eidoo"
            justify="space-between"
            title="Claim your Wollo"
        >
                {message === 'confirm' &&
                    <Fragment>
                        <View style={styles.container}>
                            <Paragraph>{`The estimated gas for this transaction is *${estimatedCost}*`}</Paragraph>
                            <Paragraph small>Click confirm to claim your Wollo tokens.</Paragraph>
                        </View>
                        <View>
                            <Button
                                label="Confirm"
                                onPress={onConfirm}
                            />
                            <Button
                                label="Cancel"
                                theme="outline"
                                onPress={onCancel}
                            />
                        </View>
                    </Fragment>
                }

                {message !== 'confirm' && message !== '' &&
                    <View style={styles.container}>
                        <Paragraph>{message}</Paragraph>
                    </View>
                }
        </StepModule>
    </Modal>
);
