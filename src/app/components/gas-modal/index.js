import React from 'react';
import {View} from 'react-native';
import Modal from 'react-native-modal';
import StepModule from 'app/components/step-module';
import Paragraph from 'app/components/paragraph';
import Button from '../button';
import styles from './styles';

export const GasComponent = ({
    estimatedCost,
    onConfirm,
    onCancel,
}) => (
    <StepModule
        onBack={onCancel}
        plain
        pad
        icon="eidoo"
        justify="space-between"
        title="Claim your Wollo"
        loading={!estimatedCost}
        loaderMessage="Please wait, estimating gas cost..."
    >
        <View style={styles.container}>
            <Paragraph>{`The estimated gas for this transaction is *${estimatedCost || ''}*`}</Paragraph>
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
    </StepModule>
);

export default ({
    visible,
    estimatedCost,
    onConfirm,
    onCancel,
    onModalHide
}) => (
    <Modal
        isVisible={visible}
        style={{margin: 0}}
        onBackButtonPress={onCancel}
        animationIn="slideInRight"
        animationOut="slideOutRight"
        onModalHide={onModalHide}
    >
        <GasComponent
            estimatedCost={estimatedCost}
            onConfirm={onConfirm}
            onCancel={onCancel}
        />
    </Modal>
);
