import React, {Fragment} from 'react';
import StepWrapper from '../../../components/step-wrapper';
import OrderedList from '../../../components/ordered-list';
import Paragraph from '../../../components/paragraph';

export default ({onNext, onBack}) => (
    <StepWrapper
        title={'Your Eidoo Wallet Address'}
        onNext={onNext}
        onBack={onBack}
        content={(
            <Fragment>
                <Paragraph>Next up in the Eidoo app.</Paragraph>
                <OrderedList
                    items={[
                        'Go to *Your Assets*',
                        'Tap the QR code button top on the right',
                        'Write down or tap the share button to copy your wallet address. (you will paste in the next step)'
                    ]}
                />
            </Fragment>
        )}
    />
);
