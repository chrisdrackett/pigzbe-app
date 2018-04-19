import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    ActivityIndicator,
    Text,
    TextInput,
    View
} from 'react-native';
import {authLogin, profileLoad} from '../actions';
import styles from './styles';
import Button from '../button';
import {color} from '../styles';

class LoginForm extends Component {
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

        if (isLoggingIn || isLoadingProfile) {
            return (
                <View style={styles.container}>
                    {isLoggingIn ? (
                        <Text style={styles.title}>Logging in...</Text>
                    ) : null}
                    {isLoadingProfile ? (
                        <Text style={styles.title}>Loading profile...</Text>
                    ) : null}
                    <ActivityIndicator size="large" color={color.white} />
                </View>
            );
        }

        return (
            <View style={styles.container}>
                <Text style={styles.title}>Login</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Key"
                    placeholderTextColor={color.white}
                    onChangeText={inputText => this.setState({inputText})}
                />
                <Button
                    label="Login"
                    onPress={() => {
                        dispatch(authLogin(this.state.inputText))
                            .then(() => dispatch(profileLoad()));
                    }}
                />
                {error && (
                    <Text style={styles.error}>{error.message}</Text>
                )}
                <Button
                    label="Help"
                    plain
                    onPress={() => navigation.navigate('Help')}
                />
            </View>
        );
    }
}

export default connect(
    state => ({
        error: state.auth.error,
        isLoggingIn: state.auth.isLoggingIn,
        isLoadingProfile: state.profile.isLoadingProfile
    })
)(LoginForm);
