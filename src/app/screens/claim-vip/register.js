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
                skippable={false}
                onNext={this.onNext}
                onBack={this.onBack}
            />
        );
    }
}

export default connect()(Register);
