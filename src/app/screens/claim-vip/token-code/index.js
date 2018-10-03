import React, {Component, Fragment} from 'react';
import StepModule from 'app/components/step-module';
import Button from 'app/components/button';
import TextInput from 'app/components/text-input';

export default class TokenCode extends Component {
    state = {
        tokenCode: '',
    }

    onChangeText = tokenCode => this.setState({tokenCode})

    onNext = () => this.props.onNext(this.state.tokenCode)

    render() {
        const {email, onBack} = this.props;

        return (
            <StepModule
                title="Your unique Token Code"
                icon="vip"
                content={`We're almost there! Please enter the unique code sent to ${email}.`}
                onBack={onBack}
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
                        label="Next"
                        onPress={this.onNext}
                    />
                </Fragment>
            </StepModule>
        );
    }
}
