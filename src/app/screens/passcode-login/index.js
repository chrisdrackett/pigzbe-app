import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View} from 'react-native';
import {load} from '../../actions';
// import styles from './styles';
import Loader from '../../components/loader';
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

    onInput = input => this.setState({input})

    onCodeEntered = code => {
        console.log(code);
        this.props.dispatch(load(code));
    }

    render() {
        const {isLoading} = this.props;

        return (
            <StepModule
                title={'Enter your Passcode'}
                scroll={false}
                tagline={`Login with your ${PASSCODE_LENGTH}-digit passcode`}
                headerChildren={(
                    <View style={{marginTop: 30}}>
                        <Dots length={PASSCODE_LENGTH} progress={this.state.input.length}/>
                    </View>
                )}
            >
                <View style={{paddingBottom: 20}}>
                    <NumPad
                        length={PASSCODE_LENGTH}
                        onInput={this.onInput}
                        onFull={this.onCodeEntered}
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

export default connect(
    state => ({
        isLoading: state.loader.isLoading,
        error: state.auth.error
    })
)(PasscodeLogin);
