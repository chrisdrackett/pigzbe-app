import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import StepWrapper from '../../components/step-wrapper';
import TxInfo from './tx-info';
import Paragraph from '../../components/paragraph';
import {
    ID_AIRDROP,
    SCREEN_CLAIM_AIRDROP_ENTER_KEYS,
    SCREEN_CLAIM_AIRDROP_ESTIMATE_GAS
} from '../../constants';

export class Balance extends Component {
    onBack = () => this.props.navigation.goBack()

    onRestart = () => this.props.navigation.navigate(SCREEN_CLAIM_AIRDROP_ENTER_KEYS)

    onNext = () => this.props.navigation.navigate(SCREEN_CLAIM_AIRDROP_ESTIMATE_GAS)

    render() {
        const {data, eth, transactionHash} = this.props;
        const startApplication = !data.complete && !data.started;
        const hasBalance = eth.balanceWollo && Number(eth.balanceWollo) > 0;
        const userBalance = eth.balanceWollo;
        const tx = data.transactionHash || transactionHash;
        const buttonNextLabel = !hasBalance ? 'Back' : startApplication ? 'Estimate Gas fees' : 'Continue';

        return (
            <StepWrapper
                icon="airdrop"
                title={startApplication ? 'Claim your Wollo' : 'Continue your application'}
                onNext={hasBalance ? this.onNext : this.onRestart}
                onBack={this.onBack}
                buttonNextLabel={buttonNextLabel}
                content={startApplication ? (
                    <Fragment>
                        <Paragraph>{`You have *${userBalance} ERC20 Wollo Tokens* in your account.`}</Paragraph>
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
                                <TxInfo />
                            </Fragment>
                        )}
                    </Fragment>
                )}
            />
        );
    }
}

export default connect(
    ({keys, claim: {claims: {[ID_AIRDROP]: {eth, data, events}}}}) => ({
        eth,
        data,
        transactionHash: events.transactionHash,
        publicKey: keys.publicKey,
    })
)(Balance);
