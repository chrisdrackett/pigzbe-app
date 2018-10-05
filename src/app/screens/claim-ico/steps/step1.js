import React, {Fragment} from 'react';
import StepWrapper from '../../../components/step-wrapper';
import Paragraph from '../../../components/paragraph';

export default ({onNext, onBack}) => (
    <StepWrapper
        title={'Before we begin'}
        onNext={onNext}
        onBack={onBack}
        content={(
            <Fragment>
                <Paragraph small>Follow a few simple steps to create a Pigzbe wallet and claim your Wollo. It's easy.</Paragraph>
                <Paragraph small>Before you begin, you will need your *public address* and *12 memorable words* (seed) from your Eidoo wallet.</Paragraph>
                <Paragraph small>In the next steps we'll show you where to find the information you need.</Paragraph>
            </Fragment>
        )}
    />
);
