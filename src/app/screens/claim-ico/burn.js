import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import StepWrapper from 'app/components/step-wrapper';
import TxInfo from './tx-info';
import Paragraph from 'app/components/paragraph';
import Progress from 'app/components/progress';
import {
    ID_ICO,
    SCREEN_CLAIM_ICO_ENTER_KEYS,
    SCREEN_DASHBOARD
} from 'app/constants';
import {
    burn,
    clearClaimData,
    loadWallet,
    appAddWarningAlert,
    appError
} from 'app/actions';

export class Burn extends Component {
    state = {
        progressClosed: false,
    }

    async componentDidMount() {
        console.log('burn balanceWei', this.props.eth.balanceWei);
        this.props.burn(this.props.eth.balanceWei);
    }

    onBack = () => this.props.navigation.goBack()

    onRestart = () => this.props.navigation.navigate(SCREEN_CLAIM_ICO_ENTER_KEYS)

    onCompleteClaim = () => {
        console.log('onCompleteClaim');
        this.setState({progressClosed: true});
        this.props.clearClaimData();
        this.props.loadWallet();
        this.props.navigation.navigate(SCREEN_DASHBOARD);
    }

    closeProgress = () => this.setState({progressClosed: true})

    render() {
        const {data, eth, transactionHash, error, loading} = this.props;
        const startApplication = !data.complete && !data.started;
        const hasBalance = eth.balanceWollo && Number(eth.balanceWollo) > 0;
        // const userBalance = eth.balanceWollo;
        const tx = data.transactionHash || transactionHash;
        const buttonNextLabel = !hasBalance ? 'Back' : startApplication ? 'Estimate Gas fees' : 'Continue';

        console.log('loading', loading);
        console.log('transactionHash', transactionHash);

        return (
            <Fragment>
                <StepWrapper
                    loading={!error}
                    title={startApplication ? 'Claim your Wollo' : 'Continue your application'}
                    // onNext={hasBalance ? this.onNext : this.onRestart}
                    onBack={this.onBack}
                    buttonNextLabel={buttonNextLabel}>
                    <Paragraph small>You didn't finish a previous Wollo claim process. Continue the process below.</Paragraph>
                    {tx && (
                        <Fragment>
                            <Paragraph small>For help contact *support@pigzbe.com* quoting your Ethereum transaction hash.</Paragraph>
                            <TxInfo />
                        </Fragment>
                    )}
                </StepWrapper>
                <Progress
                    open={!this.state.progressClosed}
                    complete={data.complete}
                    title={data.complete ? null : 'Claim progress'}
                    error={error}
                    text={data.complete ? 'Your wallet balance has been updated' : loading}
                    onPress={data.complete ? this.onCompleteClaim : this.closeProgress}
                />
            </Fragment>
        );
    }
}

export default connect(
    ({keys, claim: {claims: {[ID_ICO]: {eth, data, events}}}}) => ({
        eth,
        data,
        transactionHash: events.transactionHash,
        publicKey: keys.publicKey,
        loading: events.loading,
        error: events.error,
    }), {
        burn,
        clearClaimData,
        loadWallet,
        appAddWarningAlert,
        appError
    },
)(Burn);
