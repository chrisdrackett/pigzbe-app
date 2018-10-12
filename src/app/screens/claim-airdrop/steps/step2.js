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
    badPrivateKey
}) => (
    <StepWrapper
        title={'Import your wallet'}
        icon="airdrop"
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
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                    <TextInput
                        error={badPrivateKey}
                        value={privateKey}
                        numberOfLines={3}
                        placeholder="Your private key"
                        onChangeText={onChangePrivateKey}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                </View>
            </Fragment>
        )}
    />
);
