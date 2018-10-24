import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import StepWrapper from 'app/components/step-wrapper';
import Paragraph from 'app/components/paragraph';
import {
    ID_ICO,
    SCREEN_CLAIM,
    SCREEN_CLAIM_ICO_INFO_B,
    SCREEN_CLAIM_ICO_BURN,
} from 'app/constants';
import {
    claimStart,
    claimStop,
    initWeb3,
} from 'app/actions';

export class ClaimICO extends Component {
  state = {
      starting: true,
  }

  componentWillMount() {
      this.onInit();
  }

  componentWillReceiveProps(nextProps) {
      console.log('ClaimICO componentWillReceiveProps', this.props.navigation.isFocused());
      console.log('  nextProps.eth.coinbase', nextProps.eth.coinbase);
      console.log('  nextProps.eth.balanceWollo', nextProps.eth.balanceWollo);
      console.log('  nextProps.eth.balanceWei', nextProps.eth.balanceWei);
      console.log('  nextProps.data.coinbase', nextProps.data.coinbase);
      console.log('  nextProps.data.ethAddress', nextProps.data.ethAddress);
      console.log('  nextProps.data.transactionHash', nextProps.data.transactionHash);
      console.log('  nextProps.data.started', nextProps.data.started);
      console.log('  nextProps.data.burned', nextProps.data.burned);
      console.log('  nextProps.data.complete', nextProps.data.complete);
      console.log('  nextProps.data.error', nextProps.data.error);
      console.log('  nextProps.data', nextProps.data);


      if (!(nextProps.data.loaded && this.props.navigation.isFocused())) {
          return;
      }

      // means the burn transaction has been successfully submitted:
      const inProgress = !!(nextProps.data.started && nextProps.data.ethAddress && nextProps.data.transactionHash && nextProps.eth.coinbase && nextProps.eth.balanceWei);

      console.log('ClaimICO LOADED inProgress =', inProgress);

      this.setState({starting: false});

      if (inProgress) {
          this.props.navigation.navigate(SCREEN_CLAIM_ICO_BURN);
      }
  }

  onInit = async () => {
      this.props.claimStart(ID_ICO);
      this.props.initWeb3();
  }

  onBack = () => {
      this.props.claimStop();
      this.props.navigation.navigate(SCREEN_CLAIM);
  }

  onNext = () => this.props.navigation.navigate(SCREEN_CLAIM_ICO_INFO_B)

  render () {

      const {
          contract,
          web3,
          data,
          error
      } = this.props;

      console.log('====> error', error);

      const loading = !web3 || !contract || !data.loaded || this.state.starting;

      if (error) {
          return (
              <StepWrapper
                  title="Before we begin"
                  onNext={this.onInit}
                  onBack={this.onBack}
                  buttonNextLabel="Try again"
                  error={error}
              />
          );
      }

      return (
          <StepWrapper
              loading={loading}
              title="Before we begin"
              onNext={this.onNext}
              onBack={this.onBack}
              content={(
                  <Fragment>
                      <Paragraph small>Follow a few simple steps to create a Pigzbe wallet and claim your Wollo. It's easy.</Paragraph>
                      <Paragraph small>Before you begin, you will need your *public address* and *12 memorable words* (seed) from your Eidoo wallet.</Paragraph>
                      <Paragraph small>In the next steps we'll show you where to find the information you need.</Paragraph>
                  </Fragment>
              )}
          />
      );
  }
}

export default connect(
    ({claim: {claims: {[ID_ICO]: {eth, data, web3, events, contract}}}}) => ({
        eth,
        data,
        contract: contract.instance,
        transactionHash: events.transactionHash,
        web3: web3.instance,
        loading: events.loading,
        error: events.error,
    }), {
        initWeb3,
        claimStart,
        claimStop,
    },
)(ClaimICO);
