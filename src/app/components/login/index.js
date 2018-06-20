import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {
    Text,
    View,
    Image,
    Keyboard
} from 'react-native';
import {setUseTestnet, tryAutoLoad, load} from '../../actions';
import styles from './styles';
import Button from '../button';
import TextInput from '../text-input';
import Loader from '../loader';
import Pig from '../pig';
import {
    strings,
    // SCREEN_HELP
} from '../../constants';
import DevPanel from '../dev-panel';
import KeyboardAvoid from '../keyboard-avoid';
import Claim from '../claim';
import Container from '../container';

const Header = () => (
    <Container style={styles.containerHeader}>
        <Image style={styles.backgroundImage} source={require('./images/header.png')} />
        <Image style={styles.image} source={require('./images/pigzbe_logo.png')} />
        <Text style={styles.tagline}>{strings.loginTagline}</Text>
        <Pig/>
    </Container>
);

class Login extends Component {
    state = {
        inputText: '',
        newUserSteps: 0,
        existingUser: false
    }

    componentDidMount() {
        const {dispatch, testUserKey, useTestnet} = this.props;

        dispatch(setUseTestnet(useTestnet));

        if (__DEV__ && testUserKey) {
            this.setState({inputText: testUserKey});
        }
    }

    componentDidUpdate(prevProps) {
        const {testUserKey} = this.props;

        if (__DEV__ && prevProps.testUserKey !== testUserKey) {
            this.setState({inputText: testUserKey});
        }
    }

    onCloseClaim = () => {
        this.setState({newUser: false});
    }

    render() {
        const {
            dispatch,
            // navigation,
            isLoading,
            error,
            claimSecret
        } = this.props;

        const {newUser, existingUser} = this.state;

        console.log('claimSecret', claimSecret);

        return (
            <Container>
                {(!newUser && !existingUser) &&
                        <Fragment>
                            <Header/>
                            <Container body>
                                <View style={styles.containerText}>
                                    <Text style={styles.title}>{strings.loginTitle}</Text>
                                    <Text style={styles.subtitle}>New to Pizbe? Create an account below and claim your Wollo</Text>
                                </View>
                                <View>
                                    <Button
                                        label="New User"
                                        onPress={() => {
                                            this.setState({newUser: true});
                                        }}
                                    />
                                    <Button
                                        label="Existing User"
                                        style=""
                                        secondary
                                        onPress={() => {
                                            dispatch(tryAutoLoad());
                                            this.setState({existingUser: true});
                                        }}
                                    />
                                </View>
                            </Container>
                        </Fragment>
                }
                {newUser && (
                    <Claim
                        onCloseClaim={this.onCloseClaim}
                        onCompleteClaim={sk => dispatch(load(sk))}
                    />
                )}
                {existingUser &&
                        <KeyboardAvoid>
                            <Header/>
                            <Container body>
                                <View style={styles.containerText}>
                                    <Text style={styles.title}>{strings.loginTitle}</Text>
                                    <Text style={styles.subtitle}>{strings.loginSubtitle}</Text>
                                </View>
                                <View>
                                    <TextInput
                                        error={!!error}
                                        value={this.state.inputText}
                                        placeholder={strings.loginPlaceholder}
                                        onChangeText={inputText => this.setState({inputText})}
                                        returnKeyType="done"
                                    />
                                    <Button
                                        label={strings.loginSubmitButtonLabel}
                                        onPress={() => {
                                            Keyboard.dismiss();
                                            dispatch(load(this.state.inputText));
                                        }}
                                        disabled={!this.state.inputText}
                                    />
                                </View>
                                {/* <Button
                                    label={strings.loginHelpButtonLabel}
                                    plain
                                    onPress={() => navigation.navigate(SCREEN_HELP)}
                                /> */}
                            </Container>
                        </KeyboardAvoid>
                }
                <DevPanel/>
                <Loader
                    isLoading={isLoading}
                />
            </Container>
        );
    }
}

export default connect(
    state => ({
        testUserKey: state.auth.testUserKey,
        isLoading: state.loader.isLoading,
        error: state.auth.error,
        useTestnet: state.wollo.useTestnet
    })
)(Login);
