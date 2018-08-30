import React, {Component} from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';

import styles from './styles';
import {CHILD_PASSCODE_LENGTH} from '../../constants';

import {SCREEN_SAVE_KEYS, SCREEN_IMPORT_KEYS} from '../../constants';
import {createKeys, authCreateKid, appError} from '../../actions';

import IconPad from '../../components/icon-pad';
import StepModule from '../../components/step-module';
import Dots from '../../components/dots';


export class ChildLogin extends Component {
    state = {
        input: new Set(),
        confirmed: false,
        error: false,
        prevCode: null,
    }

    onCreate = async () => {
        await this.props.dispatch(createKeys());
        this.props.navigation.navigate(SCREEN_SAVE_KEYS);
    }

    onImport = () => this.props.navigation.navigate(SCREEN_IMPORT_KEYS)

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
            // await this.props.dispatch(authCreate(this.state.code));

            const address = this.props.navigation.getParam('address');
            console.log('onCodeConfirmed', address, code);

            await this.props.dispatch(authCreateKid(address, code));
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
                        <Dots length={CHILD_PASSCODE_LENGTH} progress={this.state.input.size}/>
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

export default connect()(ChildLogin);