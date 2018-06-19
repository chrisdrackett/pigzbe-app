import React from 'react';
import {View} from 'react-native';
import Button from '../../button';
import styles from '../styles';
import Container from '../../container';
import KeyboardAvoid from '../../keyboard-avoid';

const StepWrapper = ({children, onNext, onBack, buttonNextLabel}) => (
    <Container style={styles.containerBody}>
        <KeyboardAvoid offset={80}>
            <View style={styles.containerChildren}>
                {children}
            </View>
        </KeyboardAvoid>
        {onBack && onNext &&
            <View style={styles.containerButtons}>
                <Button label={buttonNextLabel} onPress={onNext} />
                <Button
                    label="Back"
                    secondary
                    onPress={onBack}
                />
            </View>}
    </Container>
);

StepWrapper.defaultProps = {
    buttonNextLabel: 'Next'
};

export default StepWrapper;
