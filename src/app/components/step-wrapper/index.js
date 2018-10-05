import React from 'react';
import {View} from 'react-native';
import Button from '../button';
import StepModule from '../step-module';

const StepWrapper = ({title, content, icon, children, onNext, onBack, buttonNextLabel}) => (
    <StepModule
        title={title}
        content={content}
        icon={icon}
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
    buttonNextLabel: 'Next',
    icon: 'eidoo'
};

export default StepWrapper;
