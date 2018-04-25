import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    Text,
    TextInput,
    View,
    Image
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
                <View style={styles.containerHeader}>
                    <Image style={styles.backgroundImage} source={require('../../../../assets/images/header.png')} />
                    <Image style={styles.image} source={require('../../../../assets/images/pigzbe_logo.png')} />
                    <Text style={styles.tagline}>{strings.loginTagline}</Text>
                </View>
                <View style={styles.containerBody}>

                    <Text style={styles.title}>{strings.loginTitle}</Text>
                    <Text style={styles.subtitle}>{strings.loginSubtitle}</Text>
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
                </View>
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
