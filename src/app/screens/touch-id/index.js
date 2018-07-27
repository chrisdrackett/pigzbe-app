import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View} from 'react-native';
import Button from '../../components/button';
// import {strings} from '../../constants';
import {SCREEN_SET_PASSCODE} from '../../constants';
import {settingsEnableTouchId} from '../../actions';
import StepModule from '../../components/step-module';

export class TouchId extends Component {
    onEnable = () => {
        this.props.dispatch(settingsEnableTouchId(true));
        this.onSkip();
    }

    onSkip = () => this.props.navigation.navigate(SCREEN_SET_PASSCODE)

    render() {
        return (
            <StepModule
                title="Use Touch ID?"
                icon="touch-id"
                content="We use your phone’s security in combination with it’s in-built hardware to secure your account."
                pad
            >
                <View>
                    <Button
                        label={'Enable Touch ID'}
                        onPress={this.onEnable}
                    />
                    <Button
                        theme="outline"
                        label={'Just use a passcode'}
                        onPress={this.onSkip}
                    />
                </View>

            </StepModule>
        );
    }
}

export default connect()(TouchId);
