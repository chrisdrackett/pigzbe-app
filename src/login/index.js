import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    ActivityIndicator,
    Text,
    TextInput,
    View,
    TouchableOpacity
} from 'react-native';
import {authLogin} from '../actions';
import styles from './styles';

class LoginForm extends Component {
    state = {
        inputText: ''
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
                <TouchableOpacity
                    style={styles.buttonHit}
                    onPress={() => dispatch(authLogin(this.state.inputText))}>
                    <Text style={styles.button}>Login</Text>
                </TouchableOpacity>
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
