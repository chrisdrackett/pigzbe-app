import React, {Fragment} from 'react';
import {Text} from 'react-native';
import styles from '../styles';
import StepWrapper from './stepWrapper';

export default ({
    onNext,
    onBack,
    continueApplication,
    startApplication,
    buttonNextLabel,
    userBalance
}) => (
    <StepWrapper onNext={onNext} onBack={onBack} buttonNextLabel={buttonNextLabel}>
        {continueApplication &&
            <Fragment>
                <Text style={styles.title}>Continue your application</Text>
                <Text style={styles.subtitle}>You didn't finish a previous Wollo claim process. Continue or cancel the process below.</Text>
            </Fragment>
        }
        {startApplication &&
            <Fragment>
                <Text style={styles.title}>Claim your Wollo</Text>
                <Text style={styles.subtitle}>You have {userBalance} ERC20 Tokens in your Eidoo account.</Text>
                <Text style={styles.subtitle}>Tap Claim Wollo bellow to convert your tokens to {userBalance} Wollo and create your Pigzbe wallet.</Text>
            </Fragment>
        }
    </StepWrapper>
);
