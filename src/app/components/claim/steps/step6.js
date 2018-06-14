import React from 'react';
import {ScrollView, View, Text, Image, TouchableOpacity, Share} from 'react-native';
import styles from '../styles';
import StepWrapper from './stepWrapper';

const copyKeys = async ({sk, pk}, tx) => {
    console.log('copyKeys');
    const title = 'Your Pigzbe Keys';
    const message = `${title}\n\nSecret Key: ${sk}\n\nPublic Key: ${pk}\n\n\nEthereum transaction hash: ${tx}`;

    const action = await Share.share({
        title,
        message,
    }, {
        // Android only:
        dialogTitle: title,
        // iOS only:
        excludedActivityTypes: [
            'com.apple.UIKit.activity.PostToTwitter',
            'com.apple.UIKit.activity.PostToFacebook',
        ]
    });
    console.log('action', action);
};

const KeyHolder = ({title, content, onPress}) => (
    <TouchableOpacity
        onPress={onPress}>
        <View style={styles.boxKeys}>
            <Text style={styles.boxKeysTitle}>{title}</Text>
            <View style={styles.boxKeysInner}>
                <Text style={styles.boxKeysText}>{content}</Text>
                <Image style={styles.boxKeysCopy} source={require('./images/copy.png')}/>
            </View>
        </View>
    </TouchableOpacity>
);

export default ({
    // userBalance,
    stellar,
    tx
}) => (
    <StepWrapper>
        {/* <Text style={styles.title}>Whoop!</Text> */}
        {/* <Text style={styles.subtitle}>Congrats! You are now the owner of {userBalance} Wollo, you rock.</Text> */}
        <Text style={styles.title}>Your Pigzbe Keys</Text>
        <Text style={styles.subtitle}>Below are your secret and public key’s to your Pigzbe wallet. You MUST make a SECURE COPY of these keys. If you lose these numbers, you LOSE ACCESS TO YOUR MONEY.</Text>
        <Text style={[styles.subtitle, styles.warning]}>COPY YOUR KEYS NOW!</Text>
        <ScrollView containerStyle={styles.containerLastStep} contentContainer={{paddingBottom: 30}}>
            {/* <View style={[styles.boxKeys, styles.boxTx]}>
                <Text style={styles.tagline}>Ethereum transaction hash</Text>
                <Text style={[styles.subtitle, styles.boxKeyText]}>{tx}</Text>
            </View> */}
            <KeyHolder
                title={'Secret Key:'}
                content={stellar.sk}
                onPress={() => copyKeys(stellar, tx)}
            />
            <KeyHolder
                title={'Public Key:'}
                content={stellar.pk}
                onPress={() => copyKeys(stellar, tx)}
            />
        </ScrollView>
    </StepWrapper>
);
