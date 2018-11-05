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
        setTimeout(() => {
            if (this.state.prevCode) {
                this.onCodeConfirmed(code);
            } else {
                this.setState({
                    prevCode: code,
                    input: new Set(),
                });
            }
        }, 200);
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

        if (confirmed) {
            this.setState({
                confirmed,
                error: !confirmed,
            });

            this.props.dispatch(appError(null));

            await this.props.dispatch(authCreateKid(this.props.kid, code));
        } else {
            this.setState({
                confirmed,
                error: !confirmed,
                prevCode: null,
                input: new Set(),
            });

            this.props.dispatch(appError(new Error('Passcodes do not match')));
        }
    }

    onBack = () => this.props.navigation.goBack();

    render() {
        return (
            <StepModule
                title="First time here"
                //icon="keys"
                content={this.state.prevCode ? 'Confirm your *Secret Code* by picking the same 3 images again' : 'Set your *Secret Code* by picking 3 images'}
                pad
                loading={this.props.loading}
                justify="center"
                headerChildren={(
                    <View style={{marginTop: 0}}>
                        <Dots length={KID_PASSCODE_LENGTH} progress={this.state.input.size}/>
                    </View>
                )}
                onBack={this.onBack}
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
        loading: state.loader.loading,
    })
)(KidSetLogin);
