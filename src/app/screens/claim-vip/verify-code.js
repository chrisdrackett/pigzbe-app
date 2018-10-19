import React, {Component} from 'react';
import {connect} from 'react-redux';
import StepModule from 'app/components/step-module';
import VerifyCode from 'app/components/verify-code';
import {vipRequestCode, vipConfirm} from 'app/actions';
import {SCREEN_CLAIM_VIP_FINISH} from 'app/constants';

export class TextCodeEnter extends Component {
    async componentDidMount() {
        this.props.dispatch(vipRequestCode());
    }

    onBack = () => this.props.navigation.goBack()

    onNext = async code => {
        const success = await this.props.dispatch(vipConfirm(code));
        if (success) {
            this.props.navigation.navigate(SCREEN_CLAIM_VIP_FINISH);
        }
    }

    onResend = () => this.props.dispatch(vipRequestCode())

    render() {
        const {country, phone = '', error, loading} = this.props;

        return (
            <StepModule
                title="Enter your Token Code"
                icon="code"
                content={`Now enter the code we sent to +${country}${phone.replace(/^0+/, '')}`}
                onBack={this.onBack}
                loading={loading}
                justify="space-between"
                pad
            >
                <VerifyCode
                    onVerify={this.onNext}
                    onResend={this.onResend}
                    error={error}
                />
            </StepModule>
        );
    }
}

export default connect(
    state => ({
        loading: state.vip.loading,
        error: state.vip.error,
        email: state.settings.email,
        authyId: state.settings.authyId,
        phone: state.settings.phone,
        country: state.settings.country,
    })
)(TextCodeEnter);
