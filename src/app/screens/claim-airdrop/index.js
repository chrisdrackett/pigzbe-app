import React, {Component} from 'react';
import {connect} from 'react-redux';
import StepWrapper from 'app/components/step-wrapper';
import {
    ID_AIRDROP,
    SCREEN_CLAIM,
    SCREEN_CLAIM_AIRDROP_ENTER_KEYS,
    SCREEN_CLAIM_AIRDROP_CLAIM,
} from 'app/constants';
import {
    claimStart,
    claimStop,
    // initWeb3,
    loadClaimData,
} from 'app/actions';

export class ClaimAirdrop extends Component {
  state = {
      starting: true,
  }

  componentWillMount() {
      this.onInit();
  }

  componentWillReceiveProps(nextProps) {
      console.log('ClaimAirdrop componentWillReceiveProps', this.props.navigation.isFocused());
      // console.log('  nextProps.eth.coinbase', nextProps.eth.coinbase);
      // console.log('  nextProps.eth.balanceWollo', nextProps.eth.balanceWollo);
      // console.log('  nextProps.eth.balanceWei', nextProps.eth.balanceWei);
      // console.log('  nextProps.data.coinbase', nextProps.data.coinbase);
      // console.log('  nextProps.data.ethAddress', nextProps.data.ethAddress);
      // console.log('  nextProps.data.transactionHash', nextProps.data.transactionHash);
      console.log('  nextProps.data.started', nextProps.data.started);
      console.log('  nextProps.data.burned', nextProps.data.burned);
      console.log('  nextProps.data.complete', nextProps.data.complete);
      console.log('  nextProps.data.error', nextProps.data.error);
      console.log('  nextProps.data', nextProps.data);


      if (!(nextProps.data.loaded && this.props.navigation.isFocused())) {
          return;
      }

      // means the burn transaction has been successfully submitted:
      // const inProgress = !!(nextProps.data.started && nextProps.data.ethAddress && nextProps.data.transactionHash && nextProps.eth.coinbase && nextProps.eth.balanceWei);
      const inProgress = false;

      console.log('ClaimAirdrop LOADED inProgress =', inProgress);

      this.setState({starting: false});

      if (inProgress) {
          this.props.navigation.navigate(SCREEN_CLAIM_AIRDROP_CLAIM);
      }
  }

  onInit = async () => {
      this.props.claimStart(ID_AIRDROP);
      this.props.loadClaimData();
  }

  onBack = () => {
      this.props.claimStop();
      this.props.navigation.navigate(SCREEN_CLAIM);
  }

  onNext = () => this.props.navigation.navigate(SCREEN_CLAIM_AIRDROP_ENTER_KEYS)

  render () {

      const {
          data,
          // error
      } = this.props;

      // console.log('====> error', error);

      const loading = !data.loaded || this.state.starting;

      // if (error) {
      //     return (
      //         <StepWrapper
      //             title="Claim Your Wollo"
      //             icon="airdrop"
      //             onNext={this.onInit}
      //             onBack={this.onBack}
      //             buttonNextLabel="Try again"
      //             error={error}
      //         />
      //     );
      // }

      return (
          <StepWrapper
              loading={loading}
              title="Claim Your Wollo"
              icon="airdrop"
              onNext={this.onNext}
              onBack={this.onBack}
              content="To get you validated, we just need a few quick details. This should only take a few minutes."
          />
      );
  }
}

export default connect(
    ({claim: {claims: {[ID_AIRDROP]: {
        // eth,
        data,
        events,
    }}}}) => ({
        // eth,
        data,
        // transactionHash: events.transactionHash,
        loading: events.loading,
        error: events.error,
    }), {
        loadClaimData,
        claimStart,
        claimStop,
    },
)(ClaimAirdrop);
