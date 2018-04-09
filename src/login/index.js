import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    ActivityIndicator,
    Platform,
    Text,
    TextInput,
    Button,
    View,
    StyleSheet
} from 'react-native';
import {authLogin} from '../actions';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        color: Platform.OS === 'web' ? 'red' : 'black',
        fontSize: 18
    },
    error: {
        color: 'red',
        fontSize: 18
    }
});

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
                {error && (
                    <Text style={styles.error}>{error.message}</Text>
                )}
                <TextInput
                    placeholder="Key"
                    onChangeText={inputText => this.setState({inputText})}
                />
                <Button
                    onPress={() => dispatch(authLogin(this.state.inputText))}
                    title="Login"
                    color="#841584"
                    accessibilityLabel="Login"
                    disabled={!this.state.inputText}
                />
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
