import React from 'react';
import {View, Text} from 'react-native';
import styles from '../styles';
import StepWrapper from './stepWrapper';

export default ({onNext, onBack}) => (
    <StepWrapper onNext={onNext} onBack={onBack}>
        <Text style={styles.title}>Your Eidoo Wallet Address</Text>
        <Text style={styles.subtitle}>Next up in the Eidoo app.</Text>
        <View style={styles.containerBody}>
            <Text style={styles.subtitle}>1. Go to your Assets</Text>
            <Text style={styles.subtitle}>2. Tap the QR code button top on the right</Text>
            <Text style={styles.subtitle}>3. Write down or tap the share button to copy your wallet address. (you will paste in the next step)</Text>
        </View>
    </StepWrapper>
);
