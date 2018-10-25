import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View} from 'react-native';
import Button from '../../components/button';
import Paragraph from '../../components/paragraph';
import TextInput from '../../components/text-input';
import StepModule from '../../components/step-module';
import {settingsUpdate, appError} from '../../actions';
import isEmail from '../../utils/is-email';

export class EmailSet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: props.previousEmail || '',
        };
    }

    validateEmail = () => {
        const {text} = this.state;
        const {onSetEmail, onDispatchError} = this.props;

        if (text && isEmail(text)) {
            onSetEmail(this.state.text);
        } else {
            onDispatchError('Email address not valid');
        }
    }

    render() {
        const {onBack} = this.props;
        const {email} = this.state;

        return (
            <StepModule
                customTitle="Email"
                content={
                    <View>
                        <Paragraph>Update your email below</Paragraph>

                        <TextInput
                            placeholder="Email address"
                            onChangeText={text => this.setState({text})}
                            returnKeyType="done"
                            value={email}
                        />
                    </View>
                }
                pad
                onBack={onBack}
                keyboardOffset={-200}
            >
                <View>
                    <Button
                        label="Update"
                        onPress={this.validateEmail}
                    />
                </View>
            </StepModule>
        );
    }
}

export default connect(
    state => ({
        previousEmail: state.settings.email,
    }),
    (dispatch, ownProps) => ({
        onSetEmail: email => {
            dispatch(settingsUpdate({email}));
            ownProps.navigation.goBack();
        },
        onBack: () => ownProps.navigation.goBack(),
        onDispatchError: error => {
            dispatch(appError(error));
        }
    }),
)(EmailSet);
