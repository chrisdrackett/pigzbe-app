import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View} from 'react-native';
import Button from 'app/components/button';
import {
    fundAccount,
    loadWallet,
} from 'app/actions';
// import openURL from 'app/utils/open-url';
// <Button
//     label={publicKey}
//     theme="light"
//     onPress={() => openURL(`https://horizon-testnet.stellar.org/accounts/${publicKey}`)}
//     style={{marginTop: 20}}
// />

export class Dev extends Component {
    onFund = async () => {
        this.props.onFunding(true);
        await this.props.dispatch(fundAccount());
        await this.props.dispatch(loadWallet());
        this.props.onFunding(false);
    }

    render () {
        const {
            network,
            // publicKey,
        } = this.props;

        if (network !== 'mainnet') {
            return (
                <View>
                    <Button
                        label="Fund account"
                        theme="light"
                        onPress={this.onFund}
                    />
                </View>
            );
        }
        return null;
    }
}

export default connect(
    state => ({
        network: state.config.network,
        publicKey: state.keys.publicKey,
    })
)(Dev);
