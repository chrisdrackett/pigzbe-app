import React, {Component} from 'react';
import {View, Text} from 'react-native';
import Button from '../button';
// import styles from './styles';
import bip39 from 'bip39';

const ENTROPY_BITS = 128; // 12 words

import {NativeModules} from 'react-native';
const {RNRandomBytes} = NativeModules;


// const language =
// const wordlist = bip39.wordlists[language]
// return bip39.generateMnemonic(entropyBits, rngFn, wordlist

const randomBytesAsync = length => {
    return new Promise((resolve, reject) => {
        RNRandomBytes.randomBytes(length, (err, base64String) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(new Buffer(base64String, 'base64'));
        });
    });
};

export default class HDWallet extends Component {
    state = {
        langs: '',
        mnemonic: '',
        publicKey: '',
        secretKey: ''
    }

    static defaultProps = {
    }

    async componentWillMount() {
        this.setState({
            langs: Object.keys(bip39.wordlists).join(',')
        });
    }

    generateMnemonic = async () => {
        const length = ENTROPY_BITS / 8;
        const rndBytes = await randomBytesAsync(length);

        // console.log('rndBytes', rndBytes);

        const wordlist = bip39.wordlists.english;
        const mnemonic = bip39.generateMnemonic(ENTROPY_BITS, () => rndBytes, wordlist);

        // console.log('mnemonic =', mnemonic);

        this.setState({mnemonic});
    }

    generateKeys = async () => {
    }

    render() {
        return (
            <View>
                <Text>HD Wallet</Text>
                <Text style={{fontWeight: 'bold', marginTop: 20}}>langs</Text>
                <Text>{this.state.langs}</Text>
                <Text style={{fontWeight: 'bold', marginTop: 20}}>mnemonic</Text>
                <Text>{this.state.mnemonic}</Text>
                <Button label="Generate Mnemonic" onPress={this.generateMnemonic}/>
                <Text style={{fontWeight: 'bold', marginTop: 20}}>keys</Text>
                <Text>{this.state.publicKey}</Text>
                <Text>{this.state.secretKey}</Text>
                <Button label="Generate Keys" onPress={this.generateKeys}/>
            </View>
        );
    }
}
