import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {View} from 'react-native';
import Config from 'react-native-config';
import StepWrapper from 'app/components/step-wrapper';
import Paragraph from 'app/components/paragraph';
import TextInput from 'app/components/text-input';
import {appError, getAirdropClaim} from 'app/actions';
import {SCREEN_CLAIM_AIRDROP_BALANCE} from 'app/constants';

export class EnterKeys extends Component {
    state = {
        code: (__DEV__ && Config.AIRDROP_CODE) || '',
        address: (__DEV__ && Config.AIRDROP_ADDRESS) || '',
        badAddress: false,
        badCode: false,
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

    onNext = async () => {
        const {code, address} = this.state;

        this.setState({
            loading: true,
            badAddress: false,
            badCode: false,
        });

        const result = await this.props.dispatch(getAirdropClaim(address, code));

        console.log('---------> result', result);
        const complete = result.confirmation === 'complete';

        if (result.success && !complete) {
            this.props.navigation.navigate(SCREEN_CLAIM_AIRDROP_BALANCE);
        } else if (result.success && complete) {
            this.setState({
                loading: false,
                badAddress: true,
                badCode: true,
                errorMessage: 'Already claimed',
            });
            this.props.dispatch(appError('Already claimed'));
        } else {
            this.setState({
                loading: false,
                badAddress: true,
                badCode: true,
                errorMessage: 'Check your wallet address and unique code',
            });
            this.props.dispatch(appError('Check your wallet address and unique code'));
        }
    }

    onChangeCode = code => this.setState({code})

    onChangeAddress = address => this.setState({address})

    render() {
        return (
            <StepWrapper
                loading={this.state.loading}
                title={'Verify your details'}
                icon="airdrop"
                onNext={this.onNext}
                onBack={this.onBack}
                content={(
                    <Fragment>
                        <Paragraph small>We're almost there! Enter your wallet address and unique code below and let's claim.</Paragraph>
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
                                error={this.state.badCode && this.state.errorMessage}
                                value={this.state.code}
                                numberOfLines={2}
                                placeholder="Your unique code"
                                onChangeText={this.onChangeCode}
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
