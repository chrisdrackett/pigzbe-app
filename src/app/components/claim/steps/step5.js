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
                <Text style={styles.subtitle}>You have <Text style={{fontWeight: 'bold'}}>{userBalance} ERC20 Tokens</Text> in your Eidoo account.</Text>
                <Text style={styles.subtitle}>Tap <Text style={{fontWeight: 'bold'}}>Claim Wollo</Text> bellow to convert your tokens to <Text style={{fontWeight: 'bold'}}>{userBalance} Wollo</Text> and create your Pigzbe wallet.</Text>
            </Fragment>
        }
    </StepWrapper>
);
