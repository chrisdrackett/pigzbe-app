import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {View} from 'react-native';
import Config from 'react-native-config';
import StepWrapper from '../../components/step-wrapper';
import Paragraph from '../../components/paragraph';
import TextInput from '../../components/text-input';
import {userLogin, appError} from '../../actions';
import {SCREEN_CLAIM_ICO_BALANCE} from '../../constants';

export class EnterKeys extends Component {
    state = {
        mnemonic: (__DEV__ && Config.MNEMONIC) || '',
        address: (__DEV__ && Config.PK) || '',
        badAddress: false,
        badSeed: false,
        loading: false,
    }

    componentDidMount() {
        this.focusListener = this.props.navigation.addListener('willFocus', this.reset);
    }

    componentWillUnMount() {
        this.focusListener.remove();
    }

    reset = () => this.setState({loading: false})

    onBack = () => this.props.navigation.goBack()

    onImportKey = async () => {
        const {mnemonic, address} = this.state;

        this.setState({
            loading: true,
            badAddress: false,
            badSeed: false,
        });

        const result = await this.props.dispatch(userLogin(mnemonic, address));

        console.log('result', result);

        if (result.success) {
            this.props.navigation.navigate(SCREEN_CLAIM_ICO_BALANCE);
        } else {
            this.setState({
                loading: false,
                badAddress: !result.validAddress,
                badSeed: !result.validSeed
            });

            let error = 'Check your wallet address and 12 word seed';
            if (result.validAddress && !result.validSeed) {
                error = 'Check your 12 word seed';
            } else if (!result.validAddress && result.validSeed) {
                error = 'Check your wallet address';
            }
            this.props.dispatch(appError(error));
        }
    }

    onChangeMnemonic = mnemonic => this.setState({mnemonic})

    onChangeAddress = address => this.setState({address})

    render() {
        return (
            <StepWrapper
                loading={this.state.loading}
                title={'Import your Eidoo wallet'}
                onNext={this.onImportKey}
                onBack={this.onBack}
                content={(
                    <Fragment>
                        <Paragraph small>We're almost there! Enter your Eidoo wallet address and the 12 word seed below and let's claim.</Paragraph>
                        <View>
                            <TextInput
                                error={this.state.badAddress}
                                value={this.state.address}
                                numberOfLines={2}
                                placeholder="Your Eidoo wallet address"
                                onChangeText={this.onChangeAddress}
                                autoCapitalize="none"
                                autoCorrect={false}
                            />
                            <TextInput
                                error={this.state.badSeed}
                                value={this.state.mnemonic}
                                numberOfLines={3}
                                placeholder="Your 12 word seed, you must include spaces"
                                onChangeText={this.onChangeMnemonic}
                                autoCapitalize="none"
                                autoCorrect={false}
                            />
                        </View>
                    </Fragment>
                )}
            />
        );
    }
}

export default connect()(EnterKeys);
