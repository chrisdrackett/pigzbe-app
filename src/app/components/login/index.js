import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {
    Text,
    View,
    Image,
    Dimensions,
    Keyboard
} from 'react-native';
import {tryAutoLoad, load} from '../../actions';
import styles from './styles';
import Button from '../button';
import TextInput from '../text-input';
import Loader from '../loader';
import Pig from '../pig';
import Logo from '../logo';
import {
    strings,
    // SCREEN_HELP
} from '../../constants';
import DevPanel from '../dev-panel';
import KeyboardAvoid from '../keyboard-avoid';

const getWidth = () => Dimensions.get('window').width;

class Login extends Component {
    state = {
        inputText: '',
        newUserSteps: 0,
        existingUser: false,
        deviceWidth: getWidth()
    }

    componentDidMount() {
        const {testUserKey} = this.props;

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

    getHeaderImage = () => (
        <View style={[styles.containerHeader, {
            width: this.state.deviceWidth
        }]}>
            <Image style={styles.backgroundImage} source={require('./images/header.png')} />
            <Image style={styles.image} source={require('./images/pigzbe_logo.png')} />
            <Text style={styles.tagline}>{strings.loginTagline}</Text>
            <Pig/>
        </View>
    )

    render() {
        const {
            dispatch,
            // navigation,
            isLoading,
            error
        } = this.props;

        const {newUserSteps, existingUser} = this.state;

        return (
            <View style={styles.container} onLayout={() => this.setState({
                deviceWidth: getWidth()
            })}>
                <KeyboardAvoid>

                    {(newUserSteps < 1 && !existingUser) &&
                        <Fragment>
                            {this.getHeaderImage()}
                            <View style={styles.containerBody}>
                                <Text style={styles.title}>{strings.loginTitle}</Text>
                                <Text style={styles.subtitle}>New to Pizbe? Create an account below and claim your Wollo</Text>
                                <Button
                                    label="New User"
                                    onPress={() => {
                                        this.setState({newUserSteps: 1});
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
                        </Fragment>
                    }
                    {newUserSteps > 0 &&
                        <Fragment>
                            {newUserSteps === 1 &&
                                <View style={styles.containerBodySteps}>
                                    <Logo />
                                    <Text style={styles.title}>Before we begin</Text>
                                    <Text style={styles.subtitle}>Follow a few simple steps to create a Pigzbe wallet and claim your Wollo. It's easy.</Text>
                                    <Text style={styles.subtitle}>Before you begin, you will need your public address and 12 memorable words (seed) from your Eidoo wallet.</Text><Text style={styles.subtitle}>Before you begin, you will need your public address and 12 memorable words (seed) from your Eidoo wallet.</Text>
                                    <Text style={styles.subtitle}>In the next steps we'll show you where to find the information you need</Text>
                                    <View style={styles.containerBody}>
                                        <Button
                                            label="Next"
                                            onPress={() => {
                                                this.setState({newUserSteps: 2});
                                            }}
                                        />
                                        <Button
                                            label="Back"
                                            style=""
                                            secondary
                                            onPress={() => {
                                                this.setState({newUserSteps: 0});
                                            }}
                                        />
                                    </View>
                                </View>
                            }

                            {newUserSteps === 2 &&
                                <View style={styles.containerBodySteps}>
                                    <Logo />
                                    <Text style={styles.title}>Your 12 words (seed)</Text>
                                    <Text style={styles.subtitle}>Firstly open the Eidoo App.</Text>
                                    <View style={styles.containerBody}>
                                        <Text style={styles.subtitle}>1. Go to Preferences</Text>
                                        <Text style={styles.subtitle}>2. Tap Backup Wallet and Backup Now</Text>
                                        <Text style={styles.subtitle}>3. Enter your password to unlock your wallet</Text>
                                        <Text style={styles.subtitle}>4. Now write down on paper your seed words.</Text>
                                    </View>
                                    <View style={styles.containerBody}>
                                        <Button
                                            label="Next"
                                            onPress={() => {
                                                this.setState({newUserSteps: 3});
                                            }}
                                        />
                                        <Button
                                            label="Back"
                                            style=""
                                            secondary
                                            onPress={() => {
                                                this.setState({newUserSteps: 1});
                                            }}
                                        />
                                    </View>
                                </View>
                            }

                            {newUserSteps === 3 &&
                                <View style={styles.containerBodySteps}>
                                    <Logo />
                                    <Text style={styles.title}>Your Eidoo Wallet Address</Text>
                                    <Text style={styles.subtitle}>Next up in the Eidoo app.</Text>
                                    <View style={styles.containerBody}>
                                        <Text style={styles.subtitle}>1. Go to your Assets</Text>
                                        <Text style={styles.subtitle}>2. Tap the QR code button top on the right</Text>
                                        <Text style={styles.subtitle}>3. Write down or tap the share button to copy your wallet address. (you will paste in the next step)</Text>
                                    </View>
                                    <View style={styles.containerBody}>
                                        <Button
                                            label="Next"
                                            onPress={() => {
                                                this.setState({newUserSteps: 4});
                                            }}
                                        />
                                        <Button
                                            label="Back"
                                            style=""
                                            secondary
                                            onPress={() => {
                                                this.setState({newUserSteps: 2});
                                            }}
                                        />
                                    </View>
                                </View>
                            }
                            {newUserSteps === 4 &&
                                <View style={styles.containerBodySteps}>
                                    <Logo />
                                    <Text style={styles.title}>Import your Eidoo wallet</Text>
                                    <Text style={styles.subtitle}>We're almost there! Enter your Eidoo wallet address and the 12 word seed below and lets claim.</Text>
                                    <View style={styles.containerBody}>
                                        <TextInput
                                            error={!!error}
                                            value={this.state.inputTextAddress}
                                            placeholder="Your Eidoo wallet address"
                                            onChangeText={inputTextAddress => this.setState({inputTextAddress})}
                                        />
                                        <TextInput
                                            error={!!error}
                                            value={this.state.inputTextMnemonic}
                                            placeholder="Your 12 word seed, you must include spaces"
                                            onChangeText={inputTextMnemonic => this.setState({inputTextMnemonic})}
                                        />
                                    </View>
                                    <View style={styles.containerBody}>
                                        <Button
                                            label="Next"
                                            disabled={!(this.state.inputTextAddress || this.state.inputTextMnemonic)}
                                            onPress={() => {
                                                this.setState({newUserSteps: 4});
                                            }}
                                        />
                                        <Button
                                            label="Back"
                                            style=""
                                            secondary
                                            onPress={() => {
                                                this.setState({newUserSteps: 2});
                                            }}
                                        />
                                    </View>
                                </View>
                            }
                        </Fragment>
                    }
                    {existingUser &&
                        <Fragment>
                            {this.getHeaderImage()}

                            <View style={styles.containerBody}>
                                <Text style={styles.title}>{strings.loginTitle}</Text>
                                <Text style={styles.subtitle}>{strings.loginSubtitle}</Text>
                                <TextInput
                                    error={!!error}
                                    value={this.state.inputText}
                                    placeholder={strings.loginPlaceholder}
                                    onChangeText={inputText => this.setState({inputText})}
                                />
                                <Button
                                    label={strings.loginSubmitButtonLabel}
                                    onPress={() => {
                                        Keyboard.dismiss();
                                        dispatch(load(this.state.inputText));
                                    }}
                                    disabled={!this.state.inputText}
                                />
                                {/* <Button
                                    label={strings.loginHelpButtonLabel}
                                    plain
                                    onPress={() => navigation.navigate(SCREEN_HELP)}
                                /> */}
                            </View>
                        </Fragment>}
                </KeyboardAvoid>
                <DevPanel/>
                <Loader
                    isLoading={isLoading}
                />
            </View>
        );
    }
}

export default connect(
    state => ({
        testUserKey: state.auth.testUserKey,
        isLoading: state.loader.isLoading,
        error: state.auth.error
    })
)(Login);
