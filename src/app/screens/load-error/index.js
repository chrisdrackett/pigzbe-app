import React, {Component} from 'react';
import {View} from 'react-native';
import Button from '../../components/button';
import {SCREEN_HOME} from '../../constants';
import StepModule from '../../components/step-module';

export default class LoadError extends Component {
    onBack = () => this.props.navigation.navigate(SCREEN_HOME)

    render() {
        return (
            <StepModule
                title={'Error'}
                content={'Could not connect to network. Please check your internet connection and try again.'}
                icon="settings"
                onBack={this.onBack}
                pad
            >
                <View>
                    <Button
                        label="Try again"
                        onPress={this.onBack}
                    />
                </View>
            </StepModule>
        );
    }
}
