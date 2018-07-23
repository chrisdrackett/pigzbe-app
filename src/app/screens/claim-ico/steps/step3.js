import React from 'react';
import {Text} from 'react-native';
import styles from '../styles';
import StepWrapper from './stepWrapper';
import StepList from './step-list';

export default ({onNext, onBack}) => (
    <StepWrapper onNext={onNext} onBack={onBack}>
        <Text style={styles.title}>Your Eidoo Wallet Address</Text>
        <Text style={styles.subtitle}>Next up in the Eidoo app.</Text>
        <StepList
            items={[
                'Go to *Your Assets*',
                'Tap the QR code button top on the right',
                'Write down or tap the share button to copy your wallet address. (you will paste in the next step)'
            ]}
        />
    </StepWrapper>
);
