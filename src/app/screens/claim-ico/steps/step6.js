import React, {Component} from 'react';
import {ScrollView, View, Text, TouchableOpacity, Share} from 'react-native';
import styles from '../styles';
import Button from '../../../components/button';
import Container from '../../../components/container';
import {color} from '../../../styles';
import KeyHolder from './key-holder';

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

class ConfirmCopy extends Component {
    state = {
        confirmed: false
    }

    onConfirm() {
        this.setState({confirmed: true});
    }

    render() {
        const {confirmed} = this.state;

        const {
            onBack,
            onNext
        } = this.props;

        return (
            <View style={styles.confirmCopyOverlay}>
                <View style={styles.confirmCopyContainer}>
                    <Text style={[styles.title, {
                        color: color.orange,
                        marginTop: 0,
                        marginLeft: 0,
                        marginRight: 0,
                    }]}>
                        {'You must save your keys'}
                    </Text>
                    <Text style={[styles.subtitle, {color: color.darkGrey, marginBottom: 0}]}>
                        You will <Text style={{fontWeight: 'bold'}}>not</Text> be able to view your keys beyond this point.
                    </Text>
                    <Text style={[styles.subtitle, {color: color.darkGrey, fontWeight: 'bold'}]}>
                        You MUST make a secure copy BEFORE you proceed.
                    </Text>
                    <TouchableOpacity style={styles.checkbox} onPress={() => this.setState({confirmed: !confirmed})}>
                        <View style={confirmed ? [styles.checkboxCheck, styles.checkboxActive] : styles.checkboxCheck} />
                        <Text style={[styles.subtitle, styles.warning, styles.checkboxText]}>
                            {'I confirm I have made a secure copy of my wallet keys'}
                        </Text>
                    </TouchableOpacity>
                    <Button
                        disabled={!confirmed}
                        label="I'm ready"
                        onPress={onNext}
                        style={{marginBottom: 20}}
                    />
                    <Button
                        label="Back"
                        onPress={onBack}
                        style={{
                            backgroundColor: color.blue,
                            borderColor: color.blue,
                        }}
                        textStyle={{
                            color: color.white
                        }}
                    />
                </View>
            </View>
        );
    }
}

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
