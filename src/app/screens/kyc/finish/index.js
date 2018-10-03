import React from 'react';
import {View} from 'react-native';
import StepModule from 'app/components/step-module';
import Button from 'app/components/button';

export default ({onNext, onBack, wollo}) => (
    <StepModule
        title="Congratulations"
        content={`Tap 'Claim Wollo' Below to add your ${wollo} Wollo to your Pigzbe wallet.`}
        icon="tick"
        pad
    >
        <View>
            <Button
                label="Claim Wollo"
                onPress={onNext}
            />
            <Button
                label="Cancel"
                onPress={onBack}
                theme="outline"
            />
        </View>
    </StepModule>
);
