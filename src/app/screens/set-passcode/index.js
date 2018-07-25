import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View} from 'react-native';
import {authCreate} from '../../actions';
import Loader from '../../components/loader';
import {PASSCODE_LENGTH} from '../../constants';
import StepModule from '../../components/step-module';
import NumPad from '../../components/num-pad';
import Dots from '../../components/dots';

class SetPasscode extends Component {
    state = {
        input: '',
        code: null,
        confirmed: false,
        error: false,
    }

    onInput = input => this.setState({input})

    onCodeEntered = code => {
        console.log('onCodeEntered code:', code);

        this.setState({code, input: ''});
    }

    onCodeConfirmed = code => {
        console.log('onCodeConfirmed code:', code, this.state.code);

        const confirmed = code === this.state.code;

        this.setState({
            confirmed,
            error: !confirmed
        });

        if (confirmed) {
            this.props.dispatch(authCreate(this.state.code));
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
        const {isLoading} = this.props;

        return (
            <StepModule
                title={this.state.code ? 'Re-enter Passcode' : 'Passcode needed'}
                scroll={false}
                tagline="Please create a back-up passcode to log in in the event your Touch ID doesn’t work."
                headerChildren={(
                    <View style={{marginTop: 30}}>
                        <Dots length={PASSCODE_LENGTH} progress={this.state.input.length}/>
                    </View>
                )}
            >
                <View style={{paddingBottom: 20}}>
                    <NumPad
                        key={this.state.code ? 'confirm' : 'enter'}
                        length={PASSCODE_LENGTH}
                        onInput={this.onInput}
                        onFull={this.state.code ? this.onCodeConfirmed : this.onCodeEntered}
                    />
                </View>
                <Loader
                    white
                    isLoading={isLoading}
                />
            </StepModule>

        );
    }
}

export const SetPasscodeComponent = SetPasscode;

export default connect(
    state => ({
        isLoading: state.loader.isLoading,
        error: state.auth.error
    })
)(SetPasscode);
