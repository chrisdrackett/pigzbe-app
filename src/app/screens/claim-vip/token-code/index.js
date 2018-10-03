import React, {Component, Fragment} from 'react';
import {View} from 'react-native';

import StepModule from 'app/components/step-module';
import Paragraph from 'app/components/paragraph';
import Button from 'app/components/button';
import TextInput from 'app/components/text-input';

export default class TokenCode extends Component {
    state = {
        tokenCode: '',
    }
    render() {
        const {onBack, onNext} = this.props;
        return (
            <StepModule
                title="Your unique Token Code"
                content="We're almost there! Please enter your unique token code supplied to you by Pigzbe"
                onBack={onBack}
                justify="space-between"
                pad
            >
                <Fragment>
                    <TextInput
                        numberOfLines={1}
                        placeholder="Your Pigzbe token code"
                        value={this.state.tokenCode}
                        onChangeText={(tokenCode) => this.setState({tokenCode})}
                    />
                    <Button
                        label="Next"
                        onPress={() => {
                            onNext(this.state.tokenCode);
                        }}
                    />
                </Fragment>
            </StepModule>
        );
    }
}
