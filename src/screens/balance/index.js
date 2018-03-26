import React, {Component} from 'react';
import {Platform, Text, View, StyleSheet} from 'react-native';

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

export default class HomeScreen extends Component {
    state = {
        balance: ''
    }
    // componentDidMount() {
    //     this.server = new Stellar.Server('https://horizon-testnet.stellar.org');
    //     Stellar.Network.useTestNetwork();
    // }

    // loadAccount() {
    //     const publicKey = 'GCLJQREUHENRZWCIJ3QL6EKGCAW7EF2AZYJJMF2FOQMFPXRJBWXBG5EV';
    //     this.server.loadAccount(publicKey)
    //         .then(info => console.log(info))
    //         // .then(info => this.setState({
    //         //     info,
    //         //     loading: false
    //         // }))
    //         .catch(error => {
    //             console.error(error);
    //             // this.setState({error, loading: false});
    //         });
    // }
    componentDidMount() {
        this.loadAccount();
    }

    loadAccount() {
        const publicKey = 'GCLJQREUHENRZWCIJ3QL6EKGCAW7EF2AZYJJMF2FOQMFPXRJBWXBG5EV';
        fetch(`https://horizon-testnet.stellar.org/accounts/${publicKey}`)
            .then(response => response.json())
            .then(data => data.balances.find(b => b.asset_code === 'WOL'))
            .then(wol => {
                if (!wol) {
                    return '0';
                }
                return wol.balance;
            })
            .then(balance => this.setState({
                balance
            }))
            .catch(error => console.error(error));
    }

    render() {
        const {balance} = this.state;
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
