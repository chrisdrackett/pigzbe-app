import React, {Component, Fragment} from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import {setKeys, saveKeys} from '../../actions';
import Button from '../../components/button';
import StepModule from '../../components/step-module';
import styles from './styles';
import {generateMnemonic, generateKeys} from '../../utils/hd-wallet';
import NotificationModal from '../../components/notification-modal';
import Mnemonic from '../../components/mnemonic';
import sortRandom from 'usfl/array/sort-random';
import wait from '../../utils/wait';


const getWords = mnemonic => {
    if (__DEV__) {
        return mnemonic.split(' ');
    }

    return mnemonic.split(' ').sort(sortRandom);
};

export class KeysMnemonic extends Component {
    state = {
        mnemonic: '',
        words: [],
        mnemonicConfirm: [],
        publicKey: '',
        secretKey: '',
        seedHex: 0,
        warningOpen: this.props.warningOpen,
        confirm: this.props.confirm,
        loading: this.props.loading,
    }

    static defaultProps = {
        warningOpen: false,
        confirm: false,
        loading: true,
    }

    async componentWillMount() {
        await this.generateMnemonic();
        this.generateKeys();
        await wait(0.2);
        this.setState({loading: false});
    }

    onConfirm = () => this.setState({warningOpen: true})

    dismissWarning = () => this.setState({
        warningOpen: false,
        confirm: true,
        words: getWords(this.state.mnemonic)
    })

    onDone = async () => {
        this.setState({loading: true});
        await this.props.dispatch(saveKeys());
    }

    onBack = () => this.setState({mnemonicConfirm: [], confirm: false})

    generateMnemonic = async () => {
        const {mnemonic, seedHex} = await generateMnemonic();
        console.log('mnemonic =', mnemonic);
        console.log('seedHex =', seedHex);

        this.setState({mnemonic, seedHex});
    }

    generateKeys = async () => {
        const {seedHex} = this.state;
        const keypair = generateKeys(seedHex);
        console.log('publicKey', keypair.publicKey());
        console.log('secretKey', keypair.secret());
        await this.props.dispatch(setKeys(keypair, false));
    }

    updateMnemonicConfirm = word => {
        if (this.state.mnemonicConfirm.includes(word)) {
            return this.state.mnemonicConfirm.filter(w => w !== word);
        }
        return this.state.mnemonicConfirm.concat(word);
    }

    onSelectWord = word => this.setState({
        mnemonicConfirm: this.updateMnemonicConfirm(word)
    })

    render() {
        return (
            <Fragment>
                <StepModule
                    title="Your Private Key"
                    icon="secure"
                    pad
                    onBack={this.state.confirm ? this.onBack : null}
                    loading={this.state.loading}
                    content={this.state.confirm ?
                        'Please now *select the words in the correct order* to confirm you have correctly saved them'
                        :
                        'Below is your 12 word Pigzbe wallet, Private Key. *Please write this down* and keep it in a safe place.'
                    }
                >
                    <View style={styles.container}>
                        <Mnemonic
                            mnemonic={this.state.mnemonic}
                            confirm={this.state.confirm}
                            mnemonicConfirm={this.state.mnemonicConfirm}
                            words={this.state.words}
                            onSelect={this.onSelectWord}
                        />
                        {this.state.confirm ? (
                            <Button
                                label={'Done'}
                                onPress={this.onDone}
                                disabled={this.state.mnemonicConfirm.join(' ') !== this.state.mnemonic}
                            />
                        ) : (
                            <Button
                                label={'I have written down my key'}
                                onPress={this.onConfirm}
                            />
                        )}
                    </View>
                </StepModule>
                <NotificationModal
                    open={this.state.warningOpen}
                    type="warning"
                    title="Don’t screenshot"
                    text="Anyone in posession of your Private Key will have access to your assets! Please only keep a hardcopy of your key and keep this safe."
                    onRequestClose={this.dismissWarning}
                />
            </Fragment>
        );
    }
}

export default connect()(KeysMnemonic);
