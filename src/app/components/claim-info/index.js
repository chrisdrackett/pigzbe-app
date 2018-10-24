import React, {Component, Fragment} from 'react';
import {Share} from 'react-native';
import Button from 'app/components/button';
import Title from 'app/components/title';
import Paragraph from 'app/components/paragraph';

export default class ClaimInfo extends Component {
    getInfo = () => {
        const {publicKey, data, eth, events} = this.props;
        const tx = data.transactionHash || events.transactionHash;
        return [
            `Stellar public key: ${publicKey}`,
            `Ethereum public key: ${eth.coinbase}`,
            `Balance: ${eth.balanceWollo}`,
            `Transaction hash: ${tx || 'none'}`,
            `Error message: ${data.error || 'none'}`
        ];
    }

    onShare = async () => {
        const title = 'Claim Details';
        const message = `${title}\n\n${this.getInfo().join('\n\n')}`;

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
        return (
            <Fragment>
                <Title dark style={{fontSize: 14, textAlign: 'center'}}>
                    Claim Details
                </Title>
                <Paragraph style={{fontSize: 12, textAlign: 'left'}}>
                    {this.getInfo().join('\n')}
                </Paragraph>
                <Button
                    label="Share details"
                    onPress={this.onShare}
                />
            </Fragment>
        );
    }
}
