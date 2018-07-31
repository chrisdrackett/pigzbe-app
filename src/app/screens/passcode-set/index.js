import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View} from 'react-native';
import {authCreate} from '../../actions';
import {PASSCODE_LENGTH} from '../../constants';
import StepModule from '../../components/step-module';
import NumPad from '../../components/num-pad';
import Dots from '../../components/dots';

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
        const {loading} = this.props;

        return (
            <StepModule
                scroll={false}
                title={this.state.code ? 'Re-enter Passcode' : 'Passcode needed'}
                content="Please create a back-up passcode to log in in the event your Touch ID doesn’t work."
                headerChildren={(
                    <View style={{marginTop: 30}}>
                        <Dots length={PASSCODE_LENGTH} progress={this.state.input.length}/>
                    </View>
                )}
                loading={loading}
            >
                <NumPad
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
        error: state.auth.error
    })
)(PasscodeSet);
