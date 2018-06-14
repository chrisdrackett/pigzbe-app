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
import {
    strings,
    // SCREEN_HELP
} from '../../constants';
import DevPanel from '../dev-panel';
import KeyboardAvoid from '../keyboard-avoid';
import Claim from '../claim';

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

    onCloseClaim = () => {
        this.setState({newUser: false});
    }

    render() {
        const {
            dispatch,
            // navigation,
            isLoading,
            error
        } = this.props;

        const {newUser, existingUser} = this.state;

        return (
            <View style={styles.container} onLayout={() => this.setState({
                deviceWidth: getWidth()
            })}>
                <KeyboardAvoid>

                    {(!newUser && !existingUser) &&
                        <Fragment>
                            {this.getHeaderImage()}
                            <View style={styles.containerBody}>
                                <Text style={styles.title}>{strings.loginTitle}</Text>
                                <Text style={styles.subtitle}>New to Pizbe? Create an account below and claim your Wollo</Text>
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
                        </Fragment>
                    }
                    {newUser && <Claim onCloseClaim={this.onCloseClaim}/>}
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
