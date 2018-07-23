import React from 'react';
import {View, Text} from 'react-native';
import TextInput from '../../../components/text-input';
import styles from '../styles';
import StepWrapper from './stepWrapper';

export default ({
    onNext,
    onBack,
    pk,
    mnemonic,
    onChangeMnemonic,
    onChangePk,
    badAddress,
    badSeed
}) => (
    <StepWrapper onNext={onNext} onBack={onBack}>
        <Text style={styles.title}>Import your Eidoo wallet</Text>
        <Text style={styles.subtitle}>We're almost there! Enter your Eidoo wallet address and the 12 word seed below and lets claim.</Text>
        <View style={styles.containerFields}>
            <TextInput
                error={badAddress}
                value={pk}
                numberOfLines={2}
                placeholder="Your Eidoo wallet address"
                onChangeText={onChangePk}
                returnKeyType="done"
            />
            <TextInput
                error={badSeed}
                value={mnemonic}
                numberOfLines={3}
                placeholder="Your 12 word seed, you must include spaces"
                onChangeText={onChangeMnemonic}
                returnKeyType="done"
            />
        </View>
    </StepWrapper>
);
