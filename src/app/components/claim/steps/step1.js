import React from 'react';
import {Text} from 'react-native';
import StepWrapper from './stepWrapper';
import styles from '../styles';

export default ({onNext, onBack}) => (
    <StepWrapper onNext={onNext} onBack={onBack}>
        <Text style={styles.title}>Before we begin</Text>
        <Text style={styles.subtitle}>Follow a few simple steps to create a Pigzbe wallet and claim your Wollo. It's easy.</Text>
        <Text style={styles.subtitle}>Before you begin, you will need your <Text style={{fontWeight: 'bold'}}>public address</Text> and <Text style={{fontWeight: 'bold'}}>12 memorable words</Text> (seed) from your Eidoo wallet.</Text>
        <Text style={styles.subtitle}>In the next steps we'll show you where to find the information you need</Text>
    </StepWrapper>
);
