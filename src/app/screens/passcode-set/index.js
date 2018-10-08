import React, {Component} from 'react';
import {connect} from 'react-redux';
import {authCreate, appError} from '../../actions';
import {PASSCODE_LENGTH, SCREEN_SETTINGS} from '../../constants';
import StepModule from '../../components/step-module';
import NumPad from '../../components/num-pad';
import Dots from '../../components/dots';

const getTitle = (reEnter, loggedIn) => {
    if (!reEnter && loggedIn) {
        return 'Change Passcode';
    }

    if (!reEnter) {
        return 'Passcode needed';
    }

    return 'Re-enter Passcode';
};

const getText = (reEnter, enableTouchId, touchIdSupport) => {
    if (!reEnter && enableTouchId && touchIdSupport === 'FaceID') {
        return 'Please create a back-up passcode to log in in the event your Face ID doesn’t work.';
    }

    if (!reEnter && enableTouchId) {
        return 'Please create a back-up passcode to log in in the event your Touch ID doesn’t work.';
    }

    if (!reEnter) {
        return 'Please create a passcode.';
    }

    return 'Please re-enter your passcode.';
};

export class PasscodeSet extends Component {
    state = {
        code: this.props.code,
        input: '',
        confirmed: false,
        error: false,
        isPasscodeChange: this.props.loggedIn,
        loading: false,
    }

    static defaultProps = {
        code: null,
    }

    onInput = input => this.setState({input, error: false})

    onCodeEntered = code => this.setState({code, input: ''})

    onCodeConfirmed = async code => {
        const confirmed = code === this.state.code;

        this.setState({
            confirmed,
            error: !confirmed,
            loading: confirmed,
        });

        if (confirmed) {
            this.props.dispatch(appError(null));
            await this.props.dispatch(authCreate(this.state.code));

            if (this.state.isPasscodeChange) {
                this.props.navigation.goBack();
            }
        } else {
            this.props.dispatch(appError(new Error('Passcodes do not match')));
        }
    }

    onReset = () => {
        this.setState({
            confirmed: false,
            error: false,
            loading: false,
            code: null,
            input: '',
        });
    }

    render() {
        const {loading, enableTouchId, touchIdSupport, loggedIn} = this.props;

        return (
            <StepModule
                scroll={false}
                title={getTitle(this.state.code, loggedIn)}
                content={getText(this.state.code, enableTouchId, touchIdSupport)}
                headerChildren={(
                    <Dots length={PASSCODE_LENGTH} progress={this.state.input.length}/>
                )}
                loading={loading || this.state.loading}
                onBack={this.state.code ? this.onReset : () => this.props.navigation.goBack()}
                justify="center"
            >
                <NumPad
                    error={this.state.error}
                    key={this.state.code ? 'confirm' : 'enter'}
                    length={PASSCODE_LENGTH}
                    onInput={this.onInput}
                    onFull={this.state.code ? this.onCodeConfirmed : this.onCodeEntered}
                />
            </StepModule>

        );
    }
}

export default connect(
    state => ({
        loading: state.loader.loading,
        loggedIn: state.auth.loggedIn,
        error: state.auth.error,
        enableTouchId: state.settings.enableTouchId,
        touchIdSupport: state.auth.touchIdSupport,
    })
)(PasscodeSet);
