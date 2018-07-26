import React from 'react';
// import {View} from 'react-native';
import Button from '../../../components/button';
// import styles from '../styles';
// import Container from '../../../components/container';
// import KeyboardAvoid from '../../../components/keyboard-avoid';
import StepModule from '../../../components/step-module';

const StepWrapper = ({title, content, children, onNext, onBack, buttonNextLabel}) => (
    <StepModule
        title={title}
        content={content}
        icon="eidoo"
        scroll={false}
        onBack={onBack}
        pad
    >
        {children}
        {onNext && (
            <Button secondary label={buttonNextLabel} onPress={onNext} />
        )}
    </StepModule>
);

StepWrapper.defaultProps = {
    buttonNextLabel: 'Next'
};

export default StepWrapper;
