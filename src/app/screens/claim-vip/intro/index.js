import React from 'react';
import {View} from 'react-native';
import StepModule from 'app/components/step-module';
import Button from 'app/components/button';

export default ({onNext, onBack}) => (
    <StepModule
        title="VIPs"
        content="To get you validated, we just need a few quick details. This should only take a few minutes."
        icon="vip"
        onBack={onBack}
        pad
    >
        <View>
            <Button
                label="Lets go"
                onPress={onNext}
            />
        </View>
    </StepModule>
);
