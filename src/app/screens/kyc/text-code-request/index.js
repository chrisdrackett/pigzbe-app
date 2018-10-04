import React, {Fragment} from 'react';
import {View} from 'react-native';

import StepModule from 'app/components/step-module';
import Paragraph from 'app/components/paragraph';
import Button from 'app/components/button';
import TextInput from 'app/components/text-input';

export default ({onNext, onBack, number}) => (
    <StepModule
        title="Text Code"
        icon="code"
        content={
            <Fragment>
                <Paragraph>
                    Finally, we will now send you a text message with a 6 digit code 
                </Paragraph>
                <Paragraph small>
                    This is sent to the mobile number we have on file that matches the previous Token Code. 
                </Paragraph>
                <Paragraph small>
                    Mobile ending: {number}
                </Paragraph>
            </Fragment>
        }   
        onBack={onBack}
        pad
    >
        <View>
            <Button
                label="Send code"
                onPress={onNext}
            />
        </View>
    </StepModule>
);
