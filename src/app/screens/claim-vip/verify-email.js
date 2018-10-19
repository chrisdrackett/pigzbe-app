import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import StepModule from 'app/components/step-module';
import Button from 'app/components/button';
import TextInput from 'app/components/text-input';
import {vipRequestEmail, vipVerifyEmail} from 'app/actions';
import {SCREEN_CLAIM_VIP_REQUEST_CODE} from 'app/constants';

export class VerifyEmail extends Component {
    state = {
        tokenCode: '',
    }

    async componentDidMount() {
        // const success = await this.props.dispatch(vipRequestEmail());
        await this.props.dispatch(vipRequestEmail());
    }

    onChangeText = tokenCode => this.setState({tokenCode})

    onNext = async () => {
        const {tokenCode} = this.state;
        const success = await this.props.dispatch(vipVerifyEmail(tokenCode));
        if (success) {
            this.props.navigation.navigate(SCREEN_CLAIM_VIP_REQUEST_CODE);
        }
    }

    onBack = () => this.props.navigation.goBack()

    render() {
        const {email, loading} = this.props;

        return (
            <StepModule
                title="Your unique Token Code"
                icon="vip"
                content={`We're almost there! Please enter the unique code sent to ${email}.`}
                onBack={this.onBack}
                loading={loading}
                justify="space-between"
                pad
            >
                <Fragment>
                    <TextInput
                        numberOfLines={1}
                        placeholder="Your unique code"
                        value={this.state.tokenCode}
                        onChangeText={this.onChangeText}
                    />
                    <Button
                        disabled={!this.state.tokenCode}
                        label="Next"
                        onPress={this.onNext}
                    />
                </Fragment>
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
)(VerifyEmail);
