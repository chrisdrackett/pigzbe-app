import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View} from 'react-native';
import {authCreate, appError} from '../../actions';
import {PASSCODE_LENGTH} from '../../constants';
import StepModule from '../../components/step-module';
import NumPad from '../../components/num-pad';
import Dots from '../../components/dots';

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
    }

    static defaultProps = {
        code: null,
    }

    onInput = input => this.setState({input, error: false})

    onCodeEntered = code => this.setState({code, input: ''})

    onCodeConfirmed = code => {
        const confirmed = code === this.state.code;

        this.setState({
            confirmed,
            error: !confirmed
        });

        if (confirmed) {
            this.props.dispatch(appError(null));
            this.props.dispatch(authCreate(this.state.code));
        } else {
            this.props.dispatch(appError(new Error('Passcodes do not match')));
        }
    }

    onReset = () => {
        this.setState({
            confirmed: false,
            error: false,
            code: null,
            input: '',
        });
    }

    onSkip = () => this.props.dispatch(authCreate('111111'))

    render() {
        const {loading, enableTouchId, touchIdSupport} = this.props;

        return (
            <StepModule
                scroll={false}
                title={this.state.code ? 'Re-enter Passcode' : 'Passcode needed'}
                content={getText(this.state.code, enableTouchId, touchIdSupport)}
                headerChildren={(
                    <View style={{marginTop: 30}}>
                        <Dots length={PASSCODE_LENGTH} progress={this.state.input.length}/>
                    </View>
                )}
                loading={loading}
                onBack={this.state.code ? this.onReset : null}
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
        error: state.auth.error,
        enableTouchId: state.settings.enableTouchId,
        touchIdSupport: state.auth.touchIdSupport,
    })
)(PasscodeSet);
