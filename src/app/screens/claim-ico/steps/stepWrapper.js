import React from 'react';
import {View} from 'react-native';
import Button from '../../../components/button';
import StepModule from '../../../components/step-module';

const StepWrapper = ({title, content, children, onNext, onBack, buttonNextLabel}) => (
    <StepModule
        title={title}
        content={content}
        icon="eidoo"
        onBack={onBack}
        justify="space-between"
        pad
    >
        <View>
            {children}
        </View>
        {onNext && (
            <Button label={buttonNextLabel} onPress={onNext} />
        )}
    </StepModule>
);

StepWrapper.defaultProps = {
    buttonNextLabel: 'Next'
};

export default StepWrapper;
