import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    ActivityIndicator,
    Text,
    TextInput,
    View
} from 'react-native';
import {authLogin} from '../actions';
import styles from './styles';
import Button from '../button';

class LoginForm extends Component {
    state = {
        inputText: 'SAXYJU6Q67IXM4DSOFGVJ2L2I7C2SQJSV2MDR2E64AKML5ZXO25RMISJ'
    }

    render() {
        const {
            dispatch,
            error,
            isLoggingIn
        } = this.props;

        if (isLoggingIn) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            );
        }

        return (
            <View style={styles.container}>
                <Text style={styles.title}>Login</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Key"
                    onChangeText={inputText => this.setState({inputText})}
                />
                <Button
                    label="Login"
                    onPress={() => dispatch(authLogin(this.state.inputText))}
                />
                {error && (
                    <Text style={styles.error}>{error.message}</Text>
                )}
            </View>
        );
    }
}

export default connect(
    state => ({
        error: state.auth.error,
        isLoggingIn: state.auth.isLoggingIn
    })
)(LoginForm);
