import React, {Fragment} from 'react';
import {View} from 'react-native';
import StepWrapper from '../../../components/step-wrapper';
import Paragraph from '../../../components/paragraph';
import TextInput from '../../../components/text-input';

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
    <StepWrapper
        title={'Import your Eidoo wallet'}
        onNext={onNext}
        onBack={onBack}
        content={(
            <Fragment>
                <Paragraph small>We're almost there! Enter your Eidoo wallet address and the 12 word seed below and let's claim.</Paragraph>
                <View>
                    <TextInput
                        error={badAddress}
                        value={pk}
                        numberOfLines={2}
                        placeholder="Your Eidoo wallet address"
                        onChangeText={onChangePk}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                    <TextInput
                        error={badSeed}
                        value={mnemonic}
                        numberOfLines={3}
                        placeholder="Your 12 word seed, you must include spaces"
                        onChangeText={onChangeMnemonic}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                </View>
            </Fragment>
        )}
    />
);
