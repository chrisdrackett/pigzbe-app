import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {SCREEN_CLAIM, SCREEN_DASHBOARD} from 'app/constants';

import Intro from './intro';
import TokenCode from './token-code';
import TextCodeRequest from './text-code-request';
import TextCodeEnter from './text-code-enter';
import Finish from './finish';

import {vipRequestEmail, vipVerifyEmail, vipRequestCode, vipConfirm} from '../../actions';

export class ClaimVIP extends Component {
    state = {
        step: 'intro'
    }

    setStep = step => this.setState({step})

    onStart = async () => {
        await this.props.dispatch(vipRequestEmail());
        this.setStep('tokenCode');
    }

    onVerifyEmail = async emailCode => {
        const success = await this.props.dispatch(vipVerifyEmail(emailCode));
        if (success) {
            this.setStep('textCodeRequest');
        }
    }

    onRequestCode = async () => {
        await this.props.dispatch(vipRequestCode());
        this.setStep('textCodeEnter');
    }

    onConfirm = async code => {
        const success = await this.props.dispatch(vipConfirm(code));
        if (success) {
            this.setStep('finish');
        }
    }

    onCancel = () => this.props.navigation.navigate(SCREEN_CLAIM)

    onFinish = () => this.props.navigation.navigate(SCREEN_DASHBOARD)

    onResend = () => this.props.dispatch(vipRequestCode())

    render() {
        const {step} = this.state;

        return (
            <Fragment>
                {step === 'intro' && (
                    <Intro
                        loading={this.props.loading}
                        onBack={this.onCancel}
                        onNext={this.onStart}
                    />
                )}
                {step === 'tokenCode' && (
                    <TokenCode
                        loading={this.props.loading}
                        email={this.props.email}
                        onBack={() => this.setStep('intro')}
                        onNext={this.onVerifyEmail}
                    />
                )}
                {step === 'textCodeRequest' &&
                    <TextCodeRequest
                        loading={this.props.loading}
                        onBack={() => this.setStep('tokenCode')}
                        onNext={this.onRequestCode}
                        number={this.props.phone.slice(-4)}
                    />
                }
                {step === 'textCodeEnter' &&
                    <TextCodeEnter
                        loading={this.props.loading}
                        error={this.props.error}
                        onBack={() => this.setStep('textCodeRequest')}
                        onNext={this.onConfirm}
                        onResend={this.onResend}
                        phone={this.props.phone}
                        countryCode={this.props.country}
                    />
                }
                {step === 'finish' &&
                    <Finish
                        onNext={this.onFinish}
                    />
                }
            </Fragment>
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
)(ClaimVIP);
