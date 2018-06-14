import React from 'react';
import {View, Text} from 'react-native';
import styles from '../styles';
import StepWrapper from './stepWrapper';

export default ({
    userBalance,
    stellar,
    tx
}) => (
    <StepWrapper>
        <Text style={styles.title}>Whoop!</Text>
        <Text style={styles.subtitle}>Congrats! You are now the owner of {userBalance} Wollo, you rock.</Text>
        <Text style={styles.subtitle}>Now, before you go any further, it's really IMPORTANT you make a secure copy of your NEW Pigzbe private and public keys just below.</Text>
        <View style={[styles.boxKeys, styles.boxTx]}>
            <Text style={styles.tagline}>Ethereum transaction hash</Text>
            <Text style={[styles.subtitle, styles.boxKeyText]}>{tx}</Text>
        </View>
        <View style={[styles.boxKeys, styles.boxPrivateKey]}>
            <Text style={styles.tagline}>Private Key</Text>
            <Text style={[styles.subtitle, styles.boxKeyText]}>{stellar.sk}</Text>
        </View>
        <View style={[styles.boxKeys, styles.boxPublicKey]}>
            <Text style={styles.tagline}>Public Key</Text>
            <Text style={[styles.subtitle, styles.boxKeyText]}>{stellar.pk}</Text>
        </View>
    </StepWrapper>
);
