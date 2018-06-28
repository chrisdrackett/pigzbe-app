import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {
    Text,
    View,
    Image,
    Keyboard
} from 'react-native';
import {setUseTestnet, tryAutoLoad, load, configInit} from '../../actions';
import styles from './styles';
import Button from '../button';
import TextInput from '../text-input';
import Loader from '../loader';
import Pig from '../pig';
import {strings} from '../../constants';
import DevPanel from '../dev-panel';
import KeyboardAvoid from '../keyboard-avoid';
import Claim from '../claim';
import Container from '../container';
import Config from 'react-native-config';

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
        existingUser: false,
        isStarting: true,
        failed: false
    }

    async init() {
        const {dispatch, testUserKey} = this.props;

        this.setState({isStarting: true, failed: false});

        try {
            const {NETWORK, CONFIG_URL} = Config;
            const configURL = NETWORK ? `${CONFIG_URL}?network=${NETWORK}` : CONFIG_URL;
            const config = await (await fetch(configURL)).json();
            // console.log(JSON.stringify(config, null, 2));
            if (config.message === 'Missing Authentication Token') {
                throw new Error('Failed to load config');
            }
            dispatch(configInit(config));
            dispatch(setUseTestnet(config.network !== config.NETWORK_MAINNET));

            const inputText = __DEV__ && testUserKey ? testUserKey : '';
            this.setState({isStarting: false, inputText});
        } catch (error) {
            console.log('------> ERROR');
            console.log(error);
            this.setState({
                isStarting: false,
                failed: true
            });
        }
    }

    componentDidMount() {
        this.init();
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
        const {dispatch, isLoading, error} = this.props;
        const {isStarting, newUser, existingUser, failed} = this.state;

        return (
            <Container>
                {failed && (
                    <Fragment>
                        <Header/>
                        <Container body>
                            <View style={styles.containerText}>
                                <Text style={styles.title}>Error</Text>
                                <Text style={styles.subtitle}>Could not connect to network. Please check your internet connection and try again.</Text>
                            </View>
                            <View>
                                <Button
                                    label="Try again"
                                    onPress={() => this.init()}
                                />
                            </View>
                        </Container>
                    </Fragment>
                )}
                {(!failed && !newUser && !existingUser) &&
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
                            </Container>
                        </KeyboardAvoid>
                }
                <DevPanel/>
                <Loader
                    isLoading={isLoading || isStarting}
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
