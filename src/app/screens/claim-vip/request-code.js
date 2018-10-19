import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View} from 'react-native';
import StepModule from 'app/components/step-module';
import Paragraph from 'app/components/paragraph';
import Button from 'app/components/button';
import {SCREEN_CLAIM_VIP_VERIFY_CODE} from 'app/constants';

export class RequestCode extends Component {
    onBack = () => this.props.navigation.goBack()

    onNext = () => this.props.navigation.navigate(SCREEN_CLAIM_VIP_VERIFY_CODE)

    render() {
        return (
            <StepModule
                title="Text Code"
                icon="code"
                content="Finally, we will now send you a text message with a 7 digit code"
                onBack={this.onBack}
                justify="space-between"
                loading={this.props.loading}
                pad
            >
                <View>
                    <Paragraph small>
                        This is sent to the mobile number we have on file that matches the previous Token Code.
                    </Paragraph>
                    <Paragraph small>
                        Mobile ending: {this.props.phone.slice(-4)}
                    </Paragraph>
                </View>
                <Button
                    label="Send code"
                    onPress={this.onNext}
                />
            </StepModule>
        );
    }
}

export default connect(
    state => ({
        phone: state.deviceAuth.phone || state.settings.phone,
    })
)(RequestCode);
