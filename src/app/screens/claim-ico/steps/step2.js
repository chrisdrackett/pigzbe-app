import React, {Fragment} from 'react';
import StepWrapper from './stepWrapper';
import StepList from './step-list';
import Paragraph from '../../../components/paragraph';

export default ({onNext, onBack}) => (
    <StepWrapper
        title={'Your 12 words (seed)'}
        onNext={onNext}
        onBack={onBack}
        content={(
            <Fragment>
                <Paragraph>*Firstly*, open the Eidoo App.</Paragraph>
                <StepList
                    items={[
                        'Go to *Preferences*',
                        'Tap *Backup Wallet* and *Backup Now*',
                        'Enter your password to unlock your wallet',
                        'Now write down on paper your *seed words*'
                    ]}
                />
            </Fragment>
        )}
    />
);
