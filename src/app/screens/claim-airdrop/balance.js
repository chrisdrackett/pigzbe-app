import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import StepWrapper from '../../components/step-wrapper';
import Paragraph from '../../components/paragraph';
import {
    ID_AIRDROP,
    SCREEN_CLAIM_AIRDROP_ENTER_KEYS,
    SCREEN_CLAIM_AIRDROP_CLAIM
} from '../../constants';

export class Balance extends Component {
    onBack = () => this.props.navigation.goBack()

    onRestart = () => this.props.navigation.navigate(SCREEN_CLAIM_AIRDROP_ENTER_KEYS)

    onNext = () => this.props.navigation.navigate(SCREEN_CLAIM_AIRDROP_CLAIM)

    render() {
        const {eth} = this.props;
        const hasBalance = eth.balanceWollo && Number(eth.balanceWollo) > 0;
        const userBalance = eth.balanceWollo;
        const buttonNextLabel = !hasBalance ? 'Back' : 'Claim now';

        return (
            <StepWrapper
                icon="airdrop"
                title={'Claim your Wollo'}
                onNext={hasBalance ? this.onNext : this.onRestart}
                onBack={this.onBack}
                buttonNextLabel={buttonNextLabel}
                content={(
                    <Fragment>
                        <Paragraph>{`Congratulations! You can claim *${userBalance} Wollo* tokens.`}</Paragraph>
                        {hasBalance ? (
                            <Paragraph>{`Tap the button below to create your Pigzbe wallet and claim your ${userBalance} Wollo.`}</Paragraph>
                        ) : (
                            <Paragraph>Go back to check your claim details and try again.</Paragraph>
                        )}
                    </Fragment>
                )}
            />
        );
    }
}

export default connect(
    ({claim: {claims: {[ID_AIRDROP]: {eth}}}}) => ({
        eth
    })
)(Balance);
