import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {Keyboard} from 'react-native';
import {authCreate} from '../../actions';
import Button from '../../components/button';
import Loader from '../../components/loader';
import {strings} from '../../constants';
import {SCREEN_CREATE_KEYS} from '../../constants';
import InputBoxes from '../../components/input-boxes';
import StepModule from '../../components/step-module';

class SetPasscode extends Component {
    state = {
        code: null,
        confirmed: false,
        error: false,
    }

    onCodeEntered = code => {
        console.log('code:', code);

        this.setState({code});
    }

    onCodeConfirmed = code => {
        console.log('code:', code);

        const confirmed = code === this.state.code;

        this.setState({
            confirmed,
            error: !confirmed
        });
    }

    onSubmit = () => {
        Keyboard.dismiss();
        this.props.dispatch(authCreate(this.state.code));
        // this.props.navigation.navigate(SCREEN_CREATE_KEYS);
    }

    onReset = () => {
        this.setState({
            confirmed: false,
            error: false,
            code: null,
        });
    }

    onSkip = () => this.props.dispatch(authCreate('111111'))

    render() {
        const {isLoading} = this.props;

        return (
            <StepModule
                title={this.state.code ? 'Re-enter Passcode' : 'Set Passcode'}
                icon="touch-id"
                scroll={false}
                tagline="Set up a backup 6 digit passcode."
            >
                <Fragment>
                    {this.state.code ? (
                        <InputBoxes
                            boxes={6}
                            secure
                            onFulfill={this.onCodeConfirmed}
                        />
                    ) : (
                        <InputBoxes
                            boxes={6}
                            secure
                            onFulfill={this.onCodeEntered}
                        />
                    )}
                    {this.state.code && (
                        <Fragment>
                            <Button
                                label={strings.loginSubmitButtonLabel}
                                onPress={this.onSubmit}
                                disabled={!this.state.confirmed}
                            />
                            <Button
                                secondary
                                label={'Reset'}
                                onPress={this.onReset}
                            />
                        </Fragment>
                    )}
                </Fragment>
                <Loader
                    white
                    isLoading={isLoading}
                />

            </StepModule>

        );
    }
}

export default connect(
    state => ({
        isLoading: state.loader.isLoading,
        error: state.auth.error
    })
)(SetPasscode);
