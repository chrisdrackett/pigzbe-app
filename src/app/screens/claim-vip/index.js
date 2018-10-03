import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {SCREEN_CLAIM, SCREEN_DASHBOARD} from 'app/constants';

import Intro from './intro';
import TokenCode from './token-code';
import TextCodeRequest from './text-code-request';
import TextCodeEnter from './text-code-enter';
import Finish from './finish';

export class ClaimVIP extends Component {
    state = {
        step: 'intro'
    }

    setStep = step => this.setState({step})

    onFinish = () => this.props.navigation.navigate(SCREEN_DASHBOARD)

    render() {
        const {step} = this.state;

        return (
            <Fragment>
                {step === 'intro' && (
                    <Intro
                        onBack={() => this.props.navigation.navigate(SCREEN_CLAIM)}
                        onNext={() => this.setStep('tokenCode')}
                    />
                )}
                {step === 'tokenCode' && (
                    <TokenCode
                        onBack={() => this.setStep('intro')}
                        onNext={tokenCode => {
                            // @todo store it or do API call, show success?
                            this.setStep('textCodeRequest');
                        }}
                    />
                )}
                {step === 'textCodeRequest' &&
                    <TextCodeRequest
                        onBack={() => this.setStep('tokenCode')}
                        onNext={() => {
                            // @todo do API call
                            this.setStep('textCodeEnter');
                        }}
                        number={1234}
                    />
                }
                {step === 'textCodeEnter' &&
                    <TextCodeEnter
                        onBack={() => this.setStep('textCodeRequest')}
                        onNext={textCode => {
                            // @todo do API call
                            this.setStep('finish');
                        }}
                    />
                }
                {step === 'finish' &&
                    <Finish
                        onBack={() => this.setStep('textCodeEnter')}
                        onNext={() => this.onNext}
                    />
                }
            </Fragment>
        );
    }
}

export default connect()(ClaimVIP);
