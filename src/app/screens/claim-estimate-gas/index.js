import React from 'react';
import {View} from 'react-native';
import StepModule from 'app/components/step-module';
import Paragraph from 'app/components/paragraph';
import Button from 'app/components/button';

export default ({
    icon = 'eidoo',
    estimatedCost,
    onConfirm,
    onCancel,
}) => (
    <StepModule
        onBack={onCancel}
        plain
        pad
        icon={icon}
        justify="space-between"
        title="Claim your Wollo"
        loading={!estimatedCost}
        loaderMessage="Please wait, estimating gas cost..."
        content={`The estimated gas for this transaction is *${estimatedCost || ''}*`}
    >
        <Paragraph small>Click confirm to claim your Wollo tokens.</Paragraph>
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
