import React, {Component} from 'react';
import StepModule from 'app/components/step-module';
import VerifyCode from 'app/components/verify-code';

export default class TextCodeEnter extends Component {
    render() {
        const {onNext, onResend, onBack, countryCode, phone = '', error, loading} = this.props;

        return (
            <StepModule
                title="Enter your Token Code"
                icon="code"
                content={`Now enter the code we sent to +${countryCode}${phone.replace(/^0+/, '')}`}
                onBack={onBack}
                loading={loading}
                justify="space-between"
                pad
            >
                <VerifyCode
                    onVerify={onNext}
                    onResend={onResend}
                    error={error}
                />
            </StepModule>
        );
    }
}
