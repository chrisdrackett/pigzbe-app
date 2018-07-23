import React from 'react';
import {Text} from 'react-native';
import styles from '../styles';
import StepWrapper from './stepWrapper';
import StepList from './step-list';

export default ({onNext, onBack}) => (
    <StepWrapper onNext={onNext} onBack={onBack}>
        <Text style={styles.title}>Your 12 words (seed)</Text>
        <Text style={styles.subtitle}>Firstly open the Eidoo App.</Text>
        <StepList
            items={[
                'Go to *Preferences*',
                'Tap *Backup Wallet* and *Backup Now*',
                'Enter your password to unlock your wallet',
                'Now write down on paper your *seed words*'
            ]}
        />
    </StepWrapper>
);
