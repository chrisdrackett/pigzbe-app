import React, {Component} from 'react';
import {connect} from 'react-redux';
import {SCREEN_CLAIM_VIP_REGISTER, SCREEN_CLAIM_VIP_VERIFY_EMAIL} from 'app/constants';
import StepModule from 'app/components/step-module';
import Button from 'app/components/button';

export class ClaimVIP extends Component {
    onBack = () => this.props.navigation.goBack()

    onNext = () => {
        if (this.props.authyId) {
            this.props.navigation.navigate(SCREEN_CLAIM_VIP_VERIFY_EMAIL);
        } else {
            this.props.navigation.navigate(SCREEN_CLAIM_VIP_REGISTER);
        }
    }

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
                    label="Lets go"
                    onPress={this.onNext}
                />
            </StepModule>
        );
    }
}

export default connect(
    state => ({
        email: state.settings.email,
        authyId: state.settings.authyId,
        phone: state.settings.phone,
        country: state.settings.country,
    })
)(ClaimVIP);
