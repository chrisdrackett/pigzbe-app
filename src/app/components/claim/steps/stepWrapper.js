import React from 'react';
import {View} from 'react-native';
import Button from '../../button';
import styles from '../styles';

const StepWrapper = ({children, onNext, onBack, buttonNextLabel}) => (
    <View style={styles.containerBody}>
        {children}
        {onBack && onNext &&
            <View style={styles.containerButtons}>
                <Button label={buttonNextLabel} onPress={onNext} />
                <Button
                    label="Back"
                    secondary
                    onPress={onBack}
                />
            </View>}
    </View>
);

StepWrapper.defaultProps = {
    buttonNextLabel: 'Next'
};

export default StepWrapper;
