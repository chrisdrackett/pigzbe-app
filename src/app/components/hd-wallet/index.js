import React, {Component} from 'react';
import {View, Text} from 'react-native';
import Button from '../button';
import bip39 from 'bip39';
import {generateMnemonic, generateKeys} from '../../utils/hd-wallet';

export default class HDWallet extends Component {
    state = {
        langs: '',
        mnemonic: '',
        publicKey: '',
        secretKey: '',
        seedHex: 0
    }

    static defaultProps = {
    }

    async componentWillMount() {
        this.setState({
            langs: Object.keys(bip39.wordlists).join(',')
        });
    }

    generateMnemonic = async () => {
        const {mnemonic, seedHex} = await generateMnemonic();
        console.log('mnemonic =', mnemonic);
        console.log('seedHex =', seedHex);

        this.setState({mnemonic, seedHex});
    }

    generateKeys = async () => {
        const {seedHex} = this.state;
        const keypair = generateKeys(seedHex);
        console.log('keypair', keypair);
        this.setState({
            publicKey: keypair.publicKey(),
            secretKey: keypair.secret(),
        });
    }

    render() {
        return (
            <View>
                <Text>HD Wallet</Text>
                <Text style={{fontWeight: 'bold', marginTop: 20}}>langs</Text>
                <Text>{this.state.langs}</Text>
                <Text style={{fontWeight: 'bold', marginTop: 20}}>mnemonic</Text>
                <Text>{this.state.mnemonic}</Text>
                <Text style={{fontWeight: 'bold', marginTop: 20}}>seedHex</Text>
                <Text>{this.state.seedHex}</Text>
                <Button label="Generate Mnemonic" onPress={this.generateMnemonic}/>
                <Text style={{fontWeight: 'bold', marginTop: 20}}>public key</Text>
                <Text>{this.state.publicKey}</Text>
                <Text style={{fontWeight: 'bold', marginTop: 20}}>secret key</Text>
                <Text>{this.state.secretKey}</Text>
                <Button label="Generate Keys" onPress={this.generateKeys}/>
            </View>
        );
    }
}
