import React, {Fragment} from 'react';
import {Share} from 'react-native';
import StepWrapper from '../../components/step-wrapper';
import KeyHolder from '../../components/key-holder';
import Paragraph from '../../components/paragraph';

const copyTx = async (tx, pk, stellarPK, userBalance, error) => {
    const title = 'Ethereum Transaction Details';
    const message = `${title}\n\nStellar Public Key: ${stellarPK}\n\nBalance: ${userBalance}\n\nPublic Key: ${pk}\n\nTransaction hash: ${tx}\n\nError: ${error}`;

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
    hasBalance,
    startApplication,
    buttonNextLabel,
    userBalance,
    tx,
    pk,
    stellarPK,
    error
}) => (
    <StepWrapper
        title={startApplication ? 'Claim your Wollo' : 'Continue your application'}
        onNext={onNext}
        onBack={onBack}
        buttonNextLabel={buttonNextLabel}
        content={startApplication ? (
            <Fragment>
                <Paragraph>{`You have *${userBalance} ERC20 Wollo Tokens* in your Eidoo account.`}</Paragraph>
                {hasBalance ? (
                    <Paragraph>{`Tap the button below to convert your tokens to ${userBalance} Wollo and create your Pigzbe wallet.`}</Paragraph>
                ) : (
                    <Paragraph>Go back to check your login details and try again.</Paragraph>
                )}
            </Fragment>
        ) : (
            <Fragment>
                <Paragraph small>You didn't finish a previous Wollo claim process. Continue the process below.</Paragraph>
                {tx && (
                    <Fragment>
                        <Paragraph small>For help contact *support@pigzbe.com* quoting your Ethereum transaction hash.</Paragraph>
                        <KeyHolder
                            title={'Transaction hash'}
                            content={tx}
                            onPress={() => copyTx(tx, pk, stellarPK, userBalance, error)}
                        />
                    </Fragment>
                )}
            </Fragment>
        )}
    />
);
