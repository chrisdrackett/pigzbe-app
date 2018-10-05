import React, {Fragment} from 'react';
import {View} from 'react-native';
import StepWrapper from '../../../components/step-wrapper';
import Paragraph from '../../../components/paragraph';
import TextInput from '../../../components/text-input';

export default ({
    onNext,
    onBack,
    pk,
    privateKey,
    onChangePrivateKey,
    onChangePk,
    badAddress,
    badSeed
}) => (
    <StepWrapper
        title={'Import your wallet'}
        onNext={onNext}
        onBack={onBack}
        content={(
            <Fragment>
                <Paragraph small>We're almost there! Enter your wallet address and private key below and let's claim.</Paragraph>
                <View>
                    <TextInput
                        error={badAddress}
                        value={pk}
                        numberOfLines={2}
                        placeholder="Your wallet address"
                        onChangeText={onChangePk}
                        returnKeyType="done"
                    />
                    <TextInput
                        error={badSeed}
                        value={privateKey}
                        numberOfLines={3}
                        placeholder="Your private key"
                        onChangeText={onChangePrivateKey}
                        returnKeyType="done"
                    />
                </View>
            </Fragment>
        )}
    />
);
