import React, {Component} from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';

import styles from './styles';
import {KID_PASSCODE_LENGTH} from '../../constants';

import {authCreateKid, appError} from '../../actions';

import IconPad from '../../components/icon-pad';
import StepModule from '../../components/step-module';
import Dots from '../../components/dots';


export class KidSetLogin extends Component {
    state = {
        input: new Set(),
        confirmed: false,
        error: false,
        prevCode: null,
    }

    onCodeEntered = code => {
        if (this.state.prevCode) {
            this.onCodeConfirmed(code);
        } else {
            this.setState({prevCode: code});
        }
    }

    onCodeConfirmed = async code => {
        // const confirmed = code === this.state.code;

        console.log('compare: ', this.state.prevCode, code);

        let confirmed = true;

        for (const a of code) {
            if (!this.state.prevCode.has(a)) {
                confirmed = false;
            }
        }

        console.log('confirmed: ', confirmed);

        if (confirmed) {
            this.setState({
                confirmed,
                error: !confirmed,
                loading: confirmed,
            });

            this.props.dispatch(appError(null));

            console.log('onCodeConfirmed', this.props.kid.name, code);

            await this.props.dispatch(authCreateKid(this.props.kid, code));
        } else {
            this.setState({
                confirmed,
                error: !confirmed,
                loading: confirmed,
                prevCode: null,
                input: new Set(),
            });

            this.props.dispatch(appError(new Error('Passcodes do not match')));

            console.log('--- ---', this.state);
        }
    }

    render() {
        return (
            <StepModule
                title="First time here"
                icon="keys"
                content={'Set your *Secret Code* by picking 3 images'}
                pad
                headerChildren={(
                    <View style={{marginTop: 30}}>
                        <Dots length={KID_PASSCODE_LENGTH} progress={this.state.input.size}/>
                    </View>
                )}
            >
                <View style={styles.centered}>
                    <IconPad
                        onInput={i => this.setState({input: i})}
                        onFull={this.onCodeEntered}
                        key={this.state.prevCode ? 'confirm' : 'first'}
                    />
                </View>
            </StepModule>
        );
    }
}

export default connect(
    (state, props) => ({
        kid: props.navigation.state.params.kid,
    })
)(KidSetLogin);
