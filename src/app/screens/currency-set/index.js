import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Text} from 'react-native';
import Button from '../../components/button';
import Paragraph from '../../components/paragraph'
import TextInput from '../../components/text-input';
import {settingsUpdate} from '../../actions';
import StepModule from '../../components/step-module';
import {SCREEN_SETTINGS} from '../../constants';

export class EmailSet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: props.previousEmail || '',
        }
    }

    render() {
        const {onBack, onSetEmail} = this.props;
        const {email} = this.state;

        return (
            <StepModule
                customTitle="Email"
                content={
                    <View>
                        <Paragraph>Update your email below</Paragraph>

                        <TextInput
                            placeholder="Email address"
                            onChangeText={email => this.setState({email})}
                            returnKeyType="done"
                            value={email}
                        />
                    </View>
                }
                pad
                onBack={onBack}
            >
                <View>
                    <Button
                        label="Update"
                        onPress={() => onSetEmail(this.state.email)}
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
            dispatch(settingsUpdate({email}))
            ownProps.navigation.navigate(SCREEN_SETTINGS)
        },
        onBack: () => ownProps.navigation.navigate(SCREEN_SETTINGS),
    }),
)(EmailSet);
