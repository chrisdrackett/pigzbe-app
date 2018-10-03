import React from 'react';
import {View} from 'react-native';
import StepModule from 'app/components/step-module';
import Button from 'app/components/button';

export default ({onNext}) => (
    <StepModule
        title="Congratulations"
        content="Pigzbe has registered your public key"
        icon="tick"
        justify="flex-end"
        pad
    >
        <View>
            <Button
                label="Done"
                onPress={onNext}
            />
        </View>
    </StepModule>
);
