import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    Text,
    TextInput,
    View
} from 'react-native';
import {
    authLogin,
    profileLoad
} from '../../actions';
import styles from './styles';
import Button from '../button';
import Loader from '../loader';
import Alert from '../alert';
import {color} from '../../styles';
import {
    strings,
    SCREEN_HELP
} from '../../constants';

class Login extends Component {
    state = {
        inputText: 'SAXYJU6Q67IXM4DSOFGVJ2L2I7C2SQJSV2MDR2E64AKML5ZXO25RMISJ'
    }

    render() {
        const {
            dispatch,
            navigation,
            error,
            isLoggingIn,
            isLoadingProfile
        } = this.props;

        return (
            <View style={styles.container}>
                <Text style={styles.title}>{strings.loginTagline}</Text>
                <Text style={styles.title}>{strings.loginTitle}</Text>
                <Text style={styles.title}>{strings.loginSubtitle}</Text>
                <TextInput
                    style={styles.input}
                    placeholder={strings.loginPlaceholder}
                    placeholderTextColor={color.white}
                    onChangeText={inputText => this.setState({inputText})}
                />
                <Button
                    label={strings.loginSubmitButtonLabel}
                    onPress={() => {
                        dispatch(authLogin(this.state.inputText))
                            .then(() => dispatch(profileLoad()));
                    }}
                />
                <Button
                    label={strings.loginHelpButtonLabel}
                    plain
                    onPress={() => navigation.navigate(SCREEN_HELP)}
                />
                <Loader
                    isLoading={isLoggingIn || isLoadingProfile}
                    message={isLoggingIn ? strings.loginLoadingAccount : strings.loginLoadingProfile}
                />
                <Alert
                    error={error}
                />
            </View>
        );
    }
}

export const LoginComponent = Login;

export default connect(
    state => ({
        error: state.auth.error,
        isLoggingIn: state.auth.isLoggingIn,
        isLoadingProfile: state.profile.isLoadingProfile
    })
)(Login);
