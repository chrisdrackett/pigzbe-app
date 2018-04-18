import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Platform, Text, View, StyleSheet} from 'react-native';
import {fetchBalance} from '../actions';

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

class Balance extends Component {
    componentDidMount() {
        this.loadAccount();
    }

    loadAccount() {
        const {dispatch, publicKey} = this.props;
        dispatch(fetchBalance(publicKey));
    }

    render() {
        const {balance} = this.props;
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Balance</Text>
                <Text style={styles.title}>
                    {balance.length ? `${balance} WOL` : 'Loading...'}
                </Text>
            </View>
        );
    }
}

export default connect(
    state => ({
        balance: state.wollo.balance,
        publicKey: state.auth.publicKey
    })
)(Balance);
