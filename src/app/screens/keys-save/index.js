import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Text, View, Share} from 'react-native';
import styles from './styles';
import Button from '../../components/button';
// import {strings} from '../../constants';
import Container from '../../components/container';
import Header from '../../components/header';
import KeyHolder from '../../components/key-holder';
import ConfirmCopy from '../../components/confirm-copy';
import {saveKeys} from '../../actions';
import isDesktop from '../../utils/is-desktop';

const copyKeys = async (sk, pk) => {
    const title = 'Your Pigzbe Keys';
    const message = `${title}\n\nSecret Key: ${sk}\n\nPublic Key: ${pk}\n\n`;

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
};

class KeysSave extends Component {
    state = {
        copied: false,
        showConfirm: false
    }

    onCopy = async () => {
        const {secretKey, publicKey} = this.props;
        const copied = await copyKeys(secretKey, publicKey);
        if (copied) {
            this.setState({copied});
        }
    }

    onConfirm = () => this.setState({showConfirm: true})

    onCancel = () => this.setState({showConfirm: false})

    onComplete = () => this.props.dispatch(saveKeys())

    render() {
        const {secretKey} = this.props;
        const {copied, showConfirm} = this.state;

        return (
            <Container>
                <Header/>
                <Container body>
                    <View style={styles.containerText}>
                        <Text style={styles.title}>{'Your Private Key'}</Text>
                        <Text style={styles.subtitle}>Below is your Pigzbe wallet Private Key. You must make a secure copy now. If you lose your key, you lose your funds.</Text>
                        <KeyHolder
                            title={'Secret Key'}
                            content={secretKey}
                            onPress={this.onCopy}
                        />
                    </View>
                    <View>
                        <Button
                            label={'Save Key'}
                            onPress={this.onCopy}
                        />
                        <Button
                            secondary
                            label={'Next'}
                            disabled={!copied && !isDesktop}
                            onPress={this.onConfirm}
                        />
                    </View>
                </Container>
                {showConfirm ? (
                    <ConfirmCopy
                        onBack={this.onCancel}
                        onNext={this.onComplete}
                    />
                ) : null}
            </Container>
        );
    }
}

export default connect(
    state => ({
        secretKey: state.wollo.secretKey,
        publicKey: state.wollo.publicKey
    })
)(KeysSave);
