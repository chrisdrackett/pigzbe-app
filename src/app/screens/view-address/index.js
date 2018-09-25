import React, {Component} from 'react';
import {View, Text, Share, Clipboard} from 'react-native';
import {connect} from 'react-redux';
import Button from '../../components/button';
import StepModule from '../../components/step-module';
import Title from '../../components/title';
import Paragraph from '../../components/paragraph';
import QRCode from 'react-native-qrcode';
import styles from './styles';
import {appAddSuccessAlert} from '../../actions';

export class ViewAddress extends Component {
    onBack = () => this.props.onBack()

    onCopy = async () => {
        Clipboard.setString(this.props.publicKey);
        this.props.dispatch(appAddSuccessAlert('Address copied to clipboard'));
    }

    onShare = async () => {
        const title = 'Address';
        const message = this.props.publicKey;

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

        if (result.action !== 'dismissedAction') {
            this.props.dispatch(appAddSuccessAlert('Address shared'));
        }
    }

    render() {
        const {publicKey} = this.props;

        return (
            <StepModule
                pad
                onBack={this.onBack}
                justify="space-between"
                plain
                customTitle={'Wollo Address'}
            >
                <View>
                    <Title dark style={styles.title}>
                    Only send Wollo (WLO) to this address
                    </Title>
                    <Paragraph small>
                    Sending any other digital asset will result in permanent loss.
                    </Paragraph>
                </View>
                <View style={styles.qrCode}>
                    <QRCode
                        value={publicKey}
                        size={200}
                    />
                    <Text style={styles.keyText}>{publicKey}</Text>
                </View>
                <View>
                    <Button
                        label="Copy address"
                        onPress={this.onCopy}
                        theme="outline"
                    />
                    <Button
                        label="Share"
                        onPress={this.onShare}
                        theme="outline"
                    />
                </View>
            </StepModule>
        );
    }
}

export default connect(state => ({
    publicKey: state.keys.publicKey
}))(ViewAddress);
