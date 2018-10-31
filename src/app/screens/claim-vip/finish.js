import React, {Component} from 'react';
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
                content="Thank you for submitting your Wollo Claim. Pigzbe will review your claim and contact you to notify of when you will receive you Wollo allocation."
                icon="tick"
                justify="flex-end"
                pad
            >
                <Button
                    label="Done"
                    onPress={this.onNext}
                />
            </StepModule>
        );
    }
}
