import React, {Component} from 'react';
import StepModule from 'app/components/step-module';
import Button from 'app/components/button';
import {
    SCREEN_CLAIM,
    SCREEN_CLAIM_VIP_REGISTER,
} from 'app/constants';

export default class ClaimVIP extends Component {
    onBack = () => this.props.navigation.navigate(SCREEN_CLAIM)

    onNext = () => this.props.navigation.navigate(SCREEN_CLAIM_VIP_REGISTER)

    render() {
        return (
            <StepModule
                title="VIPs"
                content="To get you validated, we just need a few quick details. This should only take a few minutes."
                icon="vip"
                onBack={this.onBack}
                justify="flex-end"
                pad
            >
                <Button
                    label="Let's go"
                    onPress={this.onNext}
                />
            </StepModule>
        );
    }
}
