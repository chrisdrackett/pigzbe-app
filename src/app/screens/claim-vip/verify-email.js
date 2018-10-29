import React, {Component, Fragment} from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import StepModule from 'app/components/step-module';
import Button from 'app/components/button';
import TextInput from 'app/components/text-input';
import Paragraph from 'app/components/paragraph';
import {vipRequestEmail, vipVerifyEmail} from 'app/actions';
import {SCREEN_CLAIM, SCREEN_CLAIM_VIP_REQUEST_CODE} from 'app/constants';

export class VerifyEmail extends Component {
    state = {
        tokenCode: '',
        notFound: false,
        loading: true,
    }

    async componentDidMount() {
        console.log('VerifyEmail vipRequestEmail');
        this.setState({loading: true});
        const success = await this.props.dispatch(vipRequestEmail());
        this.setState({notFound: !success, loading: false});
    }

    onChangeText = tokenCode => this.setState({tokenCode})

    onNext = async () => {
        this.setState({loading: true, error: null});
        const {tokenCode} = this.state;
        const success = await this.props.dispatch(vipVerifyEmail(tokenCode));
        if (success) {
            this.props.navigation.navigate(SCREEN_CLAIM_VIP_REQUEST_CODE);
        } else {
            this.setState({loading: false, error: 'Invalid code'});
        }
    }

    onBack = () => this.props.navigation.goBack()

    onCancel = () => this.props.navigation.navigate(SCREEN_CLAIM)

    render() {
        const {email, error} = this.props;

        if (this.state.notFound) {
            return (
                <StepModule
                    title="Not found"
                    content="We could not find a registered VIP user with the email address and phone number provided."
                    icon="vip"
                    justify={error ? 'space-between' : 'flex-end'}
                    pad
                >
                    <Fragment>
                        {error && (
                            <Paragraph error>{error.message || error}</Paragraph>
                        )}
                        <View>
                            <Button
                                label="Try again"
                                onPress={this.onBack}
                            />
                            <Button
                                label="Ok"
                                onPress={this.onCancel}
                            />
                        </View>
                    </Fragment>
                </StepModule>
            );
        }

        return (
            <StepModule
                title="Your unique Token Code"
                icon="vip"
                content={`We're almost there! Please enter the unique code sent to ${email}.`}
                onBack={this.onBack}
                loading={this.state.loading}
                justify="space-between"
                pad
            >
                <Fragment>
                    <TextInput
                        error={this.state.error}
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
        email: state.deviceAuth.email || state.settings.email,
    })
)(VerifyEmail);
