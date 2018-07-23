import React, {Component} from 'react';
import {ScrollView, View, Text, Share} from 'react-native';
import styles from '../styles';
import Button from '../../../components/button';
import Container from '../../../components/container';
import KeyHolder from '../../../components/key-holder';
import ConfirmCopy from '../../../components/confirm-copy';

const copyKeys = async ({sk, pk}, tx) => {
    const title = 'Your Pigzbe Keys';
    const message = `${title}\n\nSecret Key: ${sk}\n\nPublic Key: ${pk}\n\n\nEthereum transaction hash: ${tx}`;

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

export default class Step6 extends Component {
    state = {
        copied: false,
        showConfirm: false
    }

    onCopy = async () => {
        const {stellar, tx} = this.props;
        const copied = await copyKeys(stellar, tx);
        if (copied) {
            this.setState({copied});
        }
    }

    render() {
        const {copied, showConfirm} = this.state;
        const {stellar, onNext} = this.props;

        return (
            <Container style={styles.containerBody}>
                <View style={styles.containerChildren}>
                    <View>
                        <Text style={styles.title}>Your Pigzbe Keys</Text>
                        <Text style={styles.subtitle}>
                            Below are your secret and public key’s to your Pigzbe wallet. You <Text style={{fontWeight: 'bold'}}>MUST</Text> make a <Text style={{fontWeight: 'bold'}}>SECURE COPY</Text> of these keys. If you lose these numbers, you <Text style={{fontWeight: 'bold'}}>LOSE ACCESS TO YOUR MONEY</Text>.
                        </Text>
                        <Text style={[styles.subtitle, styles.warning]}>COPY YOUR KEYS NOW!</Text>
                    </View>
                    <ScrollView bounces={false} containerStyle={styles.containerLastStep} contentContainer={{paddingBottom: 30}}>
                        <KeyHolder
                            title={'Secret Key:'}
                            content={stellar.sk}
                            onPress={this.onCopy}
                        />
                        <KeyHolder
                            title={'Public Key:'}
                            content={stellar.pk}
                            onPress={this.onCopy}
                        />
                    </ScrollView>
                </View>
                <View style={styles.containerButtons}>
                    <Button
                        label={'Next'}
                        onPress={() => this.setState({showConfirm: true})}
                        disabled={!copied}
                    />
                </View>
                {showConfirm ? (
                    <ConfirmCopy
                        onBack={() => this.setState({showConfirm: false})}
                        onNext={onNext}
                    />
                ) : null}
            </Container>
        );
    }
}
