import React, {Component, Fragment} from 'react';
import {
    Text,
    View,
} from 'react-native';
import Button from '../button';
import Logo from '../logo';
import styles from './styles';

export default class Steps extends Component {
    render () {
        const {step, onChangeStep} = this.props;
        return (
            <Fragment>
                {step === 0 &&
                    <View style={styles.containerBodySteps}>
                        <Logo />
                        <Text style={styles.title}>Before we begin</Text>
                        <Text style={styles.subtitle}>Follow a few simple steps to create a Pigzbe wallet and claim your Wollo. It's easy.</Text>
                        <Text style={styles.subtitle}>Before you begin, you will need your public address and 12 memorable words (seed) from your Eidoo wallet.</Text><Text style={styles.subtitle}>Before you begin, you will need your public address and 12 memorable words (seed) from your Eidoo wallet.</Text>
                        <Text style={styles.subtitle}>In the next steps we'll show you where to find the information you need</Text>
                        <View style={styles.containerBody}>
                            <Button
                                label="Next"
                                onPress={() => {
                                    onChangeStep(2);
                                }}
                            />
                            <Button
                                label="Back"
                                style=""
                                secondary
                                onPress={() => {
                                    onChangeStep(0);
                                }}
                            />
                        </View>
                    </View>
                }

                {step === 2 &&
                    <View style={styles.containerBodySteps}>
                        <Logo />
                        <Text style={styles.title}>Your 12 words (seed)</Text>
                        <Text style={styles.subtitle}>Firstly open the Eidoo App.</Text>
                        <View style={styles.containerBody}>
                            <Text style={styles.subtitle}>1. Go to Preferences</Text>
                            <Text style={styles.subtitle}>2. Tap Backup Wallet and Backup Now</Text>
                            <Text style={styles.subtitle}>3. Enter your password to unlock your wallet</Text>
                            <Text style={styles.subtitle}>4. Now write down on paper your seed words.</Text>
                        </View>
                        <View style={styles.containerBody}>
                            <Button
                                label="Next"
                                onPress={() => {
                                    onChangeStep(3);
                                }}
                            />
                            <Button
                                label="Back"
                                style=""
                                secondary
                                onPress={() => {
                                    onChangeStep(1);
                                }}
                            />
                        </View>
                    </View>
                }

                {step === 3 &&
                    <View style={styles.containerBodySteps}>
                        <Logo />
                        <Text style={styles.title}>Your Eidoo Wallet Address</Text>
                        <Text style={styles.subtitle}>Next up in the Eidoo app.</Text>
                        <View style={styles.containerBody}>
                            <Text style={styles.subtitle}>1. Go to your Assets</Text>
                            <Text style={styles.subtitle}>2. Tap the QR code button top on the right</Text>
                            <Text style={styles.subtitle}>3. Write down or tap the share button to copy your wallet address. (you will paste in the next step)</Text>
                        </View>
                        <View style={styles.containerBody}>
                            <Button
                                label="Next"
                                onPress={() => {
                                    onChangeStep(4);
                                }}
                            />
                            <Button
                                label="Back"
                                style=""
                                secondary
                                onPress={() => {
                                    onChangeStep(2);
                                }}
                            />
                        </View>
                    </View>
                }
            </Fragment>
        );
    }
}
