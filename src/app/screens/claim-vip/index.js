import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {SCREEN_CLAIM, SCREEN_DASHBOARD} from 'app/constants';

import Intro from './intro';
import TokenCode from './token-code';
import TextCodeRequest from './text-code-request';
import TextCodeEnter from './text-code-enter';
import Finish from './finish';
import DeviceAuth from '../device-auth';

import {vipRequestEmail, vipVerifyEmail, vipRequestCode, vipConfirm} from '../../actions';

export const STEP_INTRO = 'STEP_INTRO';
export const STEP_DEVICE_AUTH = 'STEP_DEVICE_AUTH';
export const STEP_TOKEN_CODE = 'STEP_TOKEN_CODE';
export const STEP_TEXT_CODE_REQUEST = 'STEP_TEXT_CODE_REQUEST';
export const STEP_TEXT_CODE_ENTER = 'STEP_TEXT_CODE_ENTER';
export const STEP_FINISH = 'STEP_FINISH';

export class ClaimVIP extends Component {
    state = {
        step: this.props.step
    }

    static defaultProps = {
        step: STEP_INTRO
    }

    setStep = step => this.setState({step})

    onStart = async () => {
        if (this.props.authyId) {
            this.onSendEmail();
        } else {
            this.setStep(STEP_DEVICE_AUTH);
        }
    }

    onSendEmail = async () => {
        const sucess = await this.props.dispatch(vipRequestEmail());
        if (sucess) {
            this.setStep(STEP_TOKEN_CODE);
        }
    }

    onVerifyEmail = async emailCode => {
        const success = await this.props.dispatch(vipVerifyEmail(emailCode));
        if (success) {
            this.setStep(STEP_TEXT_CODE_REQUEST);
        }
    }

    onRequestCode = async () => {
        await this.props.dispatch(vipRequestCode());
        this.setStep(STEP_TEXT_CODE_ENTER);
    }

    onConfirm = async code => {
        const success = await this.props.dispatch(vipConfirm(code));
        if (success) {
            this.setStep(STEP_FINISH);
        }
    }

    onCancel = () => this.props.navigation.navigate(SCREEN_CLAIM)

    onFinish = () => this.props.navigation.navigate(SCREEN_DASHBOARD)

    onResend = () => this.props.dispatch(vipRequestCode())

    render() {
        const {step} = this.state;

        return (
            <Fragment>
                {step === STEP_INTRO && (
                    <Intro
                        loading={this.props.loading}
                        onBack={this.onCancel}
                        onNext={this.onStart}
                    />
                )}
                {step === STEP_DEVICE_AUTH && (
                    <DeviceAuth
                        skippable={false}
                        onNext={this.onSendEmail}
                    />
                )}
                {step === STEP_TOKEN_CODE && (
                    <TokenCode
                        loading={this.props.loading}
                        email={this.props.email}
                        onBack={() => this.setStep(STEP_INTRO)}
                        onNext={this.onVerifyEmail}
                    />
                )}
                {step === STEP_TEXT_CODE_REQUEST &&
                    <TextCodeRequest
                        loading={this.props.loading}
                        onBack={() => this.setStep(STEP_TOKEN_CODE)}
                        onNext={this.onRequestCode}
                        number={this.props.phone.slice(-4)}
                    />
                }
                {step === STEP_TEXT_CODE_ENTER &&
                    <TextCodeEnter
                        loading={this.props.loading}
                        error={this.props.error}
                        onBack={() => this.setStep(STEP_TEXT_CODE_REQUEST)}
                        onNext={this.onConfirm}
                        onResend={this.onResend}
                        phone={this.props.phone}
                        countryCode={this.props.country}
                    />
                }
                {step === STEP_FINISH &&
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
