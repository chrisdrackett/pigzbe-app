import React, {Fragment} from 'react';
import {Text, Share} from 'react-native';
import styles from '../styles';
import StepWrapper from './stepWrapper';
import KeyHolder from '../../../components/key-holder';

const copyTx = async (tx, pk, userBalance, error) => {
    const title = 'Ethereum Transaction Details';
    const message = `${title}\n\nBalance: ${userBalance}\n\nPublic Key: ${pk}\n\nTransaction hash: ${tx}\n\nError: ${error}`;

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

export default ({
    onNext,
    onBack,
    continueApplication,
    startApplication,
    buttonNextLabel,
    userBalance,
    tx,
    pk,
    error
}) => (
    <StepWrapper onNext={onNext} onBack={onBack} buttonNextLabel={buttonNextLabel}>
        {continueApplication &&
            <Fragment>
                <Text style={styles.title}>Continue your application</Text>
                <Text style={styles.subtitle}>You didn't finish a previous Wollo claim process. Continue or cancel the process below.</Text>
                {tx && (
                    <Fragment>
                        <Text style={styles.subtitle}>For help contact <Text style={{fontWeight: 'bold'}}>support@pigzbe.com</Text> quoting your Ethereum transaction hash:</Text>
                        <KeyHolder
                            title={'Transaction hash:'}
                            content={tx}
                            onPress={() => copyTx(tx, pk, userBalance, error)}
                        />
                    </Fragment>
                )}
            </Fragment>
        }
        {startApplication &&
            <Fragment>
                <Text style={styles.title}>Claim your Wollo</Text>
                <Text style={styles.subtitle}>You have <Text style={{fontWeight: 'bold'}}>{userBalance} ERC20 Tokens</Text> in your Eidoo account.</Text>
                {userBalance && (
                    <Text style={styles.subtitle}>Tap <Text style={{fontWeight: 'bold'}}>Claim Wollo</Text> bellow to convert your tokens to <Text style={{fontWeight: 'bold'}}>{userBalance} Wollo</Text> and create your Pigzbe wallet.</Text>
                )}
            </Fragment>
        }
    </StepWrapper>
);
