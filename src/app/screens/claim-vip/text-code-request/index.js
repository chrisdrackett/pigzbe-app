import React from 'react';
import {View} from 'react-native';

import StepModule from 'app/components/step-module';
import Paragraph from 'app/components/paragraph';
import Button from 'app/components/button';

export default ({onNext, onBack, number}) => (
    <StepModule
        title="Text Code"
        icon="code"
        content="Finally, we will now send you a text message with a 6 digit code"
        onBack={onBack}
        justify="space-between"
        pad
    >
        <View>
            <Paragraph small>
                This is sent to the mobile number we have on file that matches the previous Token Code.
            </Paragraph>
            <Paragraph small>
                Mobile ending: {number}
            </Paragraph>
        </View>
        <Button
            label="Send code"
            onPress={onNext}
        />
    </StepModule>
);
