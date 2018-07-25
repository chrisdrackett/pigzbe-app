import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {View, Share} from 'react-native';
// import styles from './styles';
import Button from '../../components/button';
// import {strings} from '../../constants';
import KeyHolder from '../../components/key-holder';
import ConfirmCopy from '../../components/confirm-copy';
import {saveKeys} from '../../actions';
import isDesktop from '../../utils/is-desktop';
import StepModule from '../../components/step-module';

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
            <Fragment>
                <StepModule
                    title="Your Private Key"
                    icon="secure"
                    scroll={false}
                    tagline="Below is your Pigzbe wallet Private Key. You must make a secure copy now. If you lose your key, you lose your funds."
                >
                    <View>
                        <KeyHolder
                            title={'Secret Key'}
                            content={secretKey}
                            onPress={this.onCopy}
                        />
                        <Button
                            secondary
                            label={'Save Key'}
                            onPress={this.onCopy}
                        />
                        <Button
                            outline
                            label={'Next'}
                            disabled={!copied && !isDesktop}
                            onPress={this.onConfirm}
                        />
                    </View>
                </StepModule>
                {showConfirm ? (
                    <ConfirmCopy
                        onBack={this.onCancel}
                        onNext={this.onComplete}
                    />
                ) : null}
            </Fragment>
        );
    }
}

export default connect(
    state => ({
        secretKey: state.wollo.secretKey,
        publicKey: state.wollo.publicKey
    })
)(KeysSave);
