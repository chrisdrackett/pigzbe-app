import React, {Component} from 'react';
import {connect} from 'react-redux';
import {loginAndLoad} from '../../actions';
import {PASSCODE_LENGTH} from '../../constants';
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

    static defaultProps = {
        title: 'Enter your Passcode',
        content: `Login with your ${PASSCODE_LENGTH}-digit passcode`,
        navigation: {state: {}},
    }

    onBack = () => {
        if (typeof this.props.onBack === 'function') {
            this.props.onBack();
            return;
        }
        this.props.navigation.goBack();
    }

    onInput = input => {
        this.setState({input});

        if (typeof this.props.onInput === 'function') {
            this.props.onInput();
        }
    }

    onCodeEntered = code => {
        if (typeof this.props.onCodeEntered === 'function') {
            this.props.onCodeEntered(code);
            return;
        }
        this.props.dispatch(loginAndLoad(code));
    }

    render() {
        const {title, content, loading, error, message} = this.props;
        const {params: {touchId} = {}} = this.props.navigation.state;
        const touchIdLogin = touchId && loading;
        return (
            <StepModule
                scroll={true}
                title={touchIdLogin ? 'Logging in' : title}
                content={content}
                headerChildren={(
                    touchIdLogin ? null : <Dots length={PASSCODE_LENGTH} progress={this.state.input.length}/>
                )}
                onBack={this.onBack}
                loading={loading}
                loaderMessage={message}
                justify="center"
                showLogo
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
