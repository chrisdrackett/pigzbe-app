import React from 'react';
import {View, Text} from 'react-native';
import styles from '../styles';
import StepWrapper from './stepWrapper';

export default ({onNext, onBack}) => (
    <StepWrapper onNext={onNext} onBack={onBack}>
        <Text style={styles.title}>Your 12 words (seed)</Text>
        <Text style={styles.subtitle}>Firstly open the Eidoo App.</Text>
        <View style={styles.container}>
            <Text style={styles.subtitle}>1. Go to Preferences</Text>
            <Text style={styles.subtitle}>2. Tap Backup Wallet and Backup Now</Text>
            <Text style={styles.subtitle}>3. Enter your password to unlock your wallet</Text>
            <Text style={styles.subtitle}>4. Now write down on paper your seed words.</Text>
        </View>
    </StepWrapper>
);
