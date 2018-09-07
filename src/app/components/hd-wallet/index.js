import React, {Component} from 'react';
import {NativeModules, View, Text} from 'react-native';
import Button from '../button';
import bip39 from 'bip39';
import {derivePath} from './ed25519-hd-key';
import {Keypair} from '@pigzbe/stellar-utils';
// import nacl from 'tweetnacl';
// console.log('nacl', nacl);
// console.log('Keypair', Keypair);

const ENTROPY_BITS = 128; // 12 words

const {RNRandomBytes} = NativeModules;

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
        const length = ENTROPY_BITS / 8;
        const rndBytes = await randomBytesAsync(length);

        // console.log('rndBytes', rndBytes);

        const wordlist = bip39.wordlists.english;
        const mnemonic = bip39.generateMnemonic(ENTROPY_BITS, () => rndBytes, wordlist);
        const seedHex = bip39.mnemonicToSeedHex(mnemonic);
        // console.log('mnemonic =', mnemonic);
        console.log('seedHex =', seedHex);

        this.setState({mnemonic, seedHex});
    }

    generateKeys = async () => {
        const {seedHex} = this.state;
        const index = 0;
        const data = derivePath(`m/44'/148'/${index}'`, seedHex);
        // return data.key
        console.log('data.key', data.key);
        const keypair = Keypair.fromRawEd25519Seed(data.key);
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
