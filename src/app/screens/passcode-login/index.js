import React, {Component} from 'react';
import {connect} from 'react-redux';
import {loginAndLoad} from '../../actions';
import {SCREEN_HOME, PASSCODE_LENGTH} from '../../constants';
import NumPad from '../../components/num-pad';
import Dots from '../../components/dots';
import StepModule from '../../components/step-module';

export class PasscodeLogin extends Component {
    state = {
        input: '',
        code: null,
        confirmed: false,
        error: false,
    }

    onBack = () => this.props.navigation.goBack()

    onInput = input => this.setState({input})

    onCodeEntered = code => this.props.dispatch(loginAndLoad(code))

    render() {
        const {loading, error, message} = this.props;

        return (
            <StepModule
                scroll={false}
                title={'Enter your Passcode'}
                content={`Login with your ${PASSCODE_LENGTH}-digit passcode`}
                headerChildren={(
                    <Dots length={PASSCODE_LENGTH} progress={this.state.input.length}/>
                )}
                onBack={this.onBack}
                loading={loading}
                loaderMessage={message}
                justify="center"
            >
                <NumPad
                    error={error}
                    length={PASSCODE_LENGTH}
                    onInput={this.onInput}
                    onFull={this.onCodeEntered}
                />
            </StepModule>
        );
    }
}

export default connect(
    state => ({
        loading: state.loader.loading,
        message: state.loader.message,
        error: state.auth.error
    })
)(PasscodeLogin);
