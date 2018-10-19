import React, {Component} from 'react';
import {connect} from 'react-redux';
import {SCREEN_CLAIM_VIP_VERIFY_EMAIL} from 'app/constants';
import DeviceAuth from '../device-auth';

export class Register extends Component {
    onBack = () => this.props.navigation.goBack()

    onNext = () => this.props.navigation.navigate(SCREEN_CLAIM_VIP_VERIFY_EMAIL)

    render() {
        return (
            <DeviceAuth
                navigation={this.props.navigation}
                skippable={false}
                requestLogin={false}
                onNext={this.onNext}
                onBack={this.onBack}
                onRegister={this.onNext}
                buttonLabel="Register"
                introText="Enter the email address and mobile number registered with Pigzbe."
            />
        );
    }
}

export default connect()(Register);
