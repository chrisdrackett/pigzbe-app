import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {Text, View, Keyboard} from 'react-native';
import {authCreate} from '../../actions';
import styles from './styles';
import Button from '../../components/button';
import Loader from '../../components/loader';
import {strings} from '../../constants';
import KeyboardAvoid from '../../components/keyboard-avoid';
import Container from '../../components/container';
import {SCREEN_CREATE_KEYS} from '../../constants';
import Header from '../../components/header';
import InputBoxes from '../../components/input-boxes';

class SetPasscode extends Component {
    state = {
        code: null,
        confirmed: false,
        error: false,
    }

    onCodeEntered = code => {
        console.log('code:', code);

        this.setState({code});
    }

    onCodeConfirmed = code => {
        console.log('code:', code);

        const confirmed = code === this.state.code;

        this.setState({
            confirmed,
            error: !confirmed
        });
    }

    onSubmit = () => {
        Keyboard.dismiss();
        this.props.dispatch(authCreate(this.state.code));
        // this.props.navigation.navigate(SCREEN_CREATE_KEYS);
    }

    onReset = () => {
        this.setState({
            confirmed: false,
            error: false,
            code: null,
        });
    }

    onSkip = () => this.props.dispatch(authCreate('111111'))

    render() {
        const {isLoading} = this.props;

        return (
            <Container>
                <KeyboardAvoid>
                    <Header/>
                    <Container body>
                        <View style={styles.containerText}>
                            <Text style={styles.title}>{this.state.code ? 'Re-enter Passcode' : 'Set Passcode'}</Text>
                            <Text style={styles.subtitle}>{'Set up a backup 6 digit passcode.'}</Text>
                        </View>
                        <View>
                            {this.state.code ? (
                                <InputBoxes
                                    boxes={6}
                                    onFulfill={this.onCodeConfirmed}
                                />
                            ) : (
                                <InputBoxes
                                    boxes={6}
                                    onFulfill={this.onCodeEntered}
                                />
                            )}
                            {this.state.code && (
                                <Fragment>
                                    <Button
                                        label={strings.loginSubmitButtonLabel}
                                        onPress={this.onSubmit}
                                        disabled={!this.state.confirmed}
                                    />
                                    <Button
                                        secondary
                                        label={'Reset'}
                                        onPress={this.onReset}
                                    />
                                </Fragment>
                            )}
                            <Button
                                label={'Skip'}
                                onPress={this.onSkip}
                            />
                        </View>
                    </Container>
                </KeyboardAvoid>
                <Loader
                    isLoading={isLoading}
                />
            </Container>
        );
    }
}

export default connect(
    state => ({
        isLoading: state.loader.isLoading,
        error: state.auth.error
    })
)(SetPasscode);
