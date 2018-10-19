import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {View} from 'react-native';
import Config from 'react-native-config';
import StepWrapper from '../../components/step-wrapper';
import Paragraph from '../../components/paragraph';
import TextInput from '../../components/text-input';
import {userLoginPrivateKey, appError} from '../../actions';
import {SCREEN_CLAIM_AIRDROP_BALANCE} from '../../constants';

export class EnterKeys extends Component {
    state = {
        privateKey: (__DEV__ && Config.PRIVATE_KEY) || '',
        address: (__DEV__ && Config.PK) || '',
        badAddress: false,
        badPrivateKey: false,
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
        const {privateKey, address} = this.state;

        this.setState({
            loading: true,
            badAddress: false,
            badPrivateKey: false,
        });

        const result = await this.props.dispatch(userLoginPrivateKey(privateKey, address));

        console.log('result', result);

        if (result.success) {
            this.props.navigation.navigate(SCREEN_CLAIM_AIRDROP_BALANCE);
        } else {
            this.setState({
                loading: false,
                badAddress: true,
                badPrivateKey: true
            });
            this.props.dispatch(appError('Check your wallet address and private key'));
        }
    }

    onChangePrivateKey = privateKey => this.setState({privateKey})

    onChangeAddress = address => this.setState({address})

    render() {
        return (
            <StepWrapper
                loading={this.state.loading}
                title={'Import your wallet'}
                icon="airdrop"
                onNext={this.onImportKey}
                onBack={this.onBack}
                content={(
                    <Fragment>
                        <Paragraph small>We're almost there! Enter your wallet address and private key below and let's claim.</Paragraph>
                        <View>
                            <TextInput
                                error={this.state.badAddress}
                                value={this.state.address}
                                numberOfLines={2}
                                placeholder="Your wallet address"
                                onChangeText={this.onChangeAddress}
                                autoCapitalize="none"
                                autoCorrect={false}
                            />
                            <TextInput
                                error={this.state.badPrivateKey}
                                value={this.state.privateKey}
                                numberOfLines={3}
                                placeholder="Your private key"
                                onChangeText={this.onChangePrivateKey}
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
