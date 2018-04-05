import React from 'react';
import {connect} from 'react-redux';
import {Platform, Text, Button, View, StyleSheet} from 'react-native';
import {authLogin, authLogout} from '../actions';

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
    }
});

export default connect(
    state => ({
        isLoggedIn: state.auth.isLoggedIn
    })
)(({
    dispatch,
    isLoggedIn
}) => (
    <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <Text>Lorem ipsum dolor sit amet</Text>
        <Text>typeof window = {typeof window}</Text>
        <Text>{isLoggedIn ? 'LOGGED IN' : 'LOGGED OUT'}</Text>
        {isLoggedIn ? (
            <Button
                onPress={() => dispatch(authLogout())}
                title="Logout"
                color="#841584"
                accessibilityLabel="Login"
            />
        ) : (
            <Button
                onPress={() => dispatch(authLogin())}
                title="Login"
                color="#841584"
                accessibilityLabel="Login"
            />
        )}
    </View>
));
