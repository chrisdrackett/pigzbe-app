import React, {Component} from 'react';
import {Share} from 'react-native';
import {connect} from 'react-redux';
import KeyHolder from 'app/components/key-holder';
import {ID_AIRDROP} from 'app/constants';

export class TxInfo extends Component {
    copyTx = async () => {
        const {publicKey, data, eth, transactionHash} = this.props;
        const title = 'Transaction Details';
        const message = `${title}\n\nStellar Public Key: ${publicKey}\n\nBalance: ${eth.balanceWollo}\n\nPublic Key: ${eth.coinbase}\n\nTransaction hash: ${transactionHash}\n\nError: ${data.error}`;

        const result = await Share.share({
            title,
            message,
        }, {
            // Android only:
            dialogTitle: title,
            // iOS only:
            excludedActivityTypes: [
                'com.apple.UIKit.activity.PostToTwitter',
                'com.apple.UIKit.activity.PostToFacebook',
                'com.apple.UIKit.activity.PostToTencentWeibo',
                'com.apple.UIKit.activity.PostToWeibo',
            ]
        });
        console.log('result', result);
        return result.action !== 'dismissedAction';
    }

    render() {
        const {data, transactionHash} = this.props;
        const tx = data.transactionHash || transactionHash;

        return (
            <KeyHolder
                title={'Transaction hash'}
                content={tx}
                onPress={this.copyTx}
            />
        );
    }
}

export default connect(
    ({keys, claim: {claims: {[ID_AIRDROP]: {eth, data, events}}}}) => ({
        eth,
        data,
        transactionHash: events.transactionHash,
        publicKey: keys.publicKey,
        loading: events.loading,
        error: events.error,
    })
)(TxInfo);
