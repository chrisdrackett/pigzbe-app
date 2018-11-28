import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {View, Text, Share, Clipboard} from 'react-native';
import Button from '../../components/button';
import StepModule from '../../components/step-module';
import Title from '../../components/title';
import QRCode from 'react-native-qrcode';
import styles from './styles';
import Alert from 'app/components/alert';
import {stayLoggedIn} from 'app/actions';

export class ViewAddress extends Component {
    state = {
        alertMessage: null,
    }

    showAlert = alertMessage => this.setState({alertMessage})

    onDismissAlert = () => this.setState({alertMessage: null})

    onBack = () => this.props.onBack()

    onCopy = async () => {
        Clipboard.setString(this.props.publicKey);
        this.showAlert('Address copied to clipboard');
    }

    onShare = async () => {
        this.props.dispatch(stayLoggedIn(true));

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
                // 'com.apple.UIKit.activity.PostToTwitter',
                'com.apple.UIKit.activity.PostToFacebook',
                // 'com.apple.UIKit.activity.PostToTencentWeibo',
                // 'com.apple.UIKit.activity.PostToWeibo',
            ]
        });

        if (result.action !== 'dismissedAction') {
            this.showAlert('Address shared');
        }

        this.props.dispatch(stayLoggedIn(false));
    }

    render() {
        const {publicKey} = this.props;

        return (
            <Fragment>
                <Alert
                    type="success"
                    message={this.state.alertMessage}
                    onDismiss={this.onDismissAlert}
                />
                <StepModule
                    pad
                    onBack={this.onBack}
                    justify="space-between"
                    plain
                    customTitle={'Wollo Address'}
                >
                    <View>
                        <Title dark style={styles.title}>
                            This is your public wallet address
                        </Title>
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
            </Fragment>
        );
    }
}

export default connect()(ViewAddress);
