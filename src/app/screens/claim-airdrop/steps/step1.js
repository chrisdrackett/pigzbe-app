import React from 'react';
import StepWrapper from '../../../components/step-wrapper';

export default ({onNext, onBack}) => (
    <StepWrapper
        title="Claim Your Wollo"
        icon="airdrop"
        onNext={onNext}
        onBack={onBack}
        content="To get you validated, we just need a few quick details. This should only take a few minutes."
    />
);
