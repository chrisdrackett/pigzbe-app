import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import StepWrapper from 'app/components/step-wrapper';
import Paragraph from 'app/components/paragraph';
import Progress from 'app/components/progress';
import ClaimInfo from 'app/components/claim-info';
import {
    ID_AIRDROP,
    SCREEN_DASHBOARD
} from 'app/constants';
import {
    claimAirdrop,
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
        this.onContinue();
    }

    onBack = () => this.props.navigation.goBack()

    onContinue = () => {
        this.setState({progressClosed: false});
        this.props.claimAirdrop();
    }

    onCompleteClaim = () => {
        this.setState({progressClosed: true});
        this.props.clearClaimData();
        this.props.loadWallet();
        this.props.navigation.navigate(SCREEN_DASHBOARD);
    }

    closeProgress = () => this.setState({progressClosed: true})

    render() {
        const {data, eth, events, error, loading, publicKey} = this.props;
        const tx = data.transactionHash || events.transactionHash;

        console.log('loading', loading);
        console.log('transactionHash', tx);

        return (
            <Fragment>
                <StepWrapper
                    icon="airdrop"
                    loading={!error}
                    title="Claim your Wollo"
                    onNext={this.onContinue}
                    onBack={this.onBack}
                    buttonNextLabel="Continue">
                    <Paragraph small style={{marginTop: 30}}>
                        You didn't finish a previous Wollo claim process. Continue the process below.
                    </Paragraph>
                    <Fragment>
                        <Paragraph small>For help contact *support@pigzbe.com* quoting your claim details below.</Paragraph>
                        <ClaimInfo
                            data={data}
                            events={events}
                            eth={eth}
                            publicKey={publicKey}
                        />
                    </Fragment>
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
    ({keys, claim: {claims: {[ID_AIRDROP]: {eth, data, events}}}}) => ({
        eth,
        data,
        events,
        publicKey: keys.publicKey,
        loading: events.loading,
        error: events.error,
    }), {
        claimAirdrop,
        clearClaimData,
        loadWallet,
        appAddWarningAlert,
        appError
    },
)(Burn);
