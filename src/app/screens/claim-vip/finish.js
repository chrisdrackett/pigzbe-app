import React, {Component} from 'react';
import {View} from 'react-native';
import StepModule from 'app/components/step-module';
import Button from 'app/components/button';
import {SCREEN_DASHBOARD} from 'app/constants';

export default class Finish extends Component {
    onBack = () => this.props.navigation.goBack()

    onNext = () => this.props.navigation.navigate(SCREEN_DASHBOARD)

    render() {
        return (
            <StepModule
                title="Congratulations"
                content="Pigzbe has registered your public key"
                icon="tick"
                justify="flex-end"
                pad
            >
                <View>
                    <Button
                        label="Done"
                        onPress={this.onNext}
                    />
                </View>
            </StepModule>
        );
    }
}
