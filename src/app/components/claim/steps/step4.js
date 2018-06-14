import React from 'react';
import {View, Text} from 'react-native';
import TextInput from '../../text-input';
import styles from '../styles';
import StepWrapper from './stepWrapper';

export default ({
    onNext,
    onBack,
    error,
    pk,
    mnemonic,
    onChangeMnemonic,
    onChangePk
}) => (
    <StepWrapper onNext={onNext} onBack={onBack}>
        <Text style={styles.title}>Import your Eidoo wallet</Text>
        <Text style={styles.subtitle}>We're almost there! Enter your Eidoo wallet address and the 12 word seed below and lets claim.</Text>
        <View style={styles.containerBody}>
            <TextInput
                error={!!error}
                value={pk}
                placeholder="Your Eidoo wallet address"
                onChangeText={onChangePk}
            />
            <TextInput
                error={!!error}
                value={mnemonic}
                placeholder="Your 12 word seed, you must include spaces"
                onChangeText={onChangeMnemonic}
            />
        </View>
    </StepWrapper>
);
