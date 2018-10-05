import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {utils} from 'web3';
import Config from 'react-native-config';
import {
    Step1,
    Step2,
    Step3,
    Step4,
    Step5
} from './steps';
import Loader from '../../components/loader';
import Progress from '../../components/progress';
import Modal from './modal';
import {userLogin, getGasPrice} from '../../actions/claim-eth';
import {loadWallet} from '../../actions/wollo';
import {clearClaimData} from '../../actions/claim-data';
import {transfer, burn, initWeb3} from '../../actions/claim-contract';
import {isValidSeed} from '../../utils/web3';
import {SCREEN_DASHBOARD, SCREEN_SETTINGS} from '../../constants';

export class ClaimICO extends Component {
  state = {
      step: 1,
      error: null,
      mnemonic: (__DEV__ && Config.MNEMONIC) || '',
      pk: (__DEV__ && Config.PK) || '',
      badAddress: false,
      badSeed: false,
      loading: 'Loading',
      clickedClose: false,
      modal: {
          visible: false,
          message: '',
      },
      estimatedCost: null,
  }

  componentWillMount() {
      this.props.initWeb3();
  }

  componentWillReceiveProps(nextProps) {
      console.log('componentWillReceiveProps', nextProps);

      if (nextProps.claimData && Object.keys(nextProps.claimData).length === 0 && nextProps.claimData.constructor === Object) {
          this.setState({loading: null, step: 1});
      }

      const unfinished = this.props.claimData && nextProps.eth.coinbase && nextProps.eth.balanceWollo;
      const hasError = this.props.claimData && this.props.claimData.error;

      if (unfinished || hasError) {
          this.setState({step: 5, loading: null});
      }
  }

  onImportKey = async () => {
      const {mnemonic, pk} = this.state;

      const badAddress = pk.trim() === '' || !utils.isAddress(pk.trim());
      const badSeed = mnemonic.trim() === '' || !isValidSeed(mnemonic.trim());
      this.setState({badAddress, badSeed});

      if (badAddress || badSeed) {
          return;
      }

      let publicKey = pk.trim();
      if (pk.substr(0, 2) !== '0x') {
          publicKey = `0x${pk}`;
      }

      const success = await this.props.userLogin(mnemonic.trim(), publicKey);

      if (success) {
          this.setState({loading: 'Loading your Ethereum account'});
      }
  }

  onChangeStep = step => this.setState({step})

  onSubmitBurn = async () => {
      const {claimData, contract, eth} = this.props;

      if (claimData.transactionHash && claimData.value) {
          this.props.burn(claimData.value);
          return;
      }

      this.setState({
          modal: {
              visible: true,
              message: 'Please wait, estimating gas cost...',
          }
      });

      try {
          const amountBurn = eth.balanceWei;
          // const gasPrice = await this.props.web3.eth.getGasPrice();
          const gasPrice = await this.props.getGasPrice();
          const estimatedGas = await contract.methods.burn(amountBurn).estimateGas({from: eth.coinbase});
          const estimatedCost = utils.fromWei(String(estimatedGas * gasPrice), 'ether');

          let estimatedCostUSD = '';
          try {
              const exchange = await (await fetch('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD,GBP,EUR,JPY')).json();
              estimatedCostUSD = (exchange.USD * Number(estimatedCost)).toFixed(2);
          } catch (e) {}

          this.setState({
              estimatedCost: `${estimatedCost} ETH ($${estimatedCostUSD})`,
              modal: {
                  visible: true,
                  message: 'confirm'
              }
          });
      } catch (err) {
          console.log('onSubmitBurn error:');
          console.log(err);
      }
  }

  onConfirmedSubmitBurn = () => {
      this.closeModal();

      this.props.burn(this.props.eth.balanceWei);
  }

  closeModal = () => this.setState({
      modal: {
          visible: false,
          message: ''
      }
  });

  closeProgress = () => this.setState({clickedClose: true})

  onChangeMnemonic = mnemonic => this.setState({mnemonic})

  onChangePk = pk => this.setState({pk})

  onCloseClaim = () => this.props.navigation.navigate(SCREEN_DASHBOARD)

  // onBack = () => this.props.navigation.navigate(SCREEN_CLAIM)
  onBack = () => this.props.navigation.navigate(SCREEN_SETTINGS)

  onCompleteClaim = () => {
      console.log('onCompleteClaim');
      this.props.clearClaimData();
      this.props.loadWallet();
      this.props.navigation.navigate(SCREEN_DASHBOARD);
  }

  onStep1 = () => this.onChangeStep(1)
  onStep2 = () => this.onChangeStep(2)
  onStep3 = () => this.onChangeStep(3)
  onStep4 = () => this.onChangeStep(4)
  onStep5 = () => this.onChangeStep(5)

  render () {

      const {
          estimatedCost,
          mnemonic,
          pk,
          badAddress,
          badSeed,
          step,
          modal,
      } = this.state;

      const {
          loading,
          contract,
          eth,
          transactionHash,
          web3,
          claimData,
          errorBurning,
          publicKey
      } = this.props;

      console.log('===> step', step);
      console.log('web3', web3);
      console.log('contract', contract);
      console.log('claimData', claimData);
      console.log('this.state.loading', this.state.loading);

      if (!web3 || !contract || !claimData || this.state.loading !== null) {
          return (
              <Loader loading message={this.state.loading} />
          );
      }

      const tx = claimData.transactionHash || transactionHash;

      return (
          <Fragment>
              <Fragment>
                  {step === 1 && <Step1 onNext={this.onStep2} onBack={this.onBack} />}
                  {step === 2 && <Step2 onNext={this.onStep3} onBack={this.onStep1} />}
                  {step === 3 && <Step3 onNext={this.onStep4} onBack={this.onStep2} />}
                  {step === 4 &&
                      <Step4
                          onNext={this.onImportKey}
                          onBack={this.onStep3}
                          badAddress={badAddress}
                          badSeed={badSeed}
                          pk={pk}
                          mnemonic={mnemonic}
                          onChangeMnemonic={this.onChangeMnemonic}
                          onChangePk={this.onChangePk}
                      />
                  }

                  {step === 5 &&
                      <Step5
                          error={errorBurning || claimData.error}
                          tx={tx}
                          pk={pk}
                          stellarPK={publicKey}
                          userBalance={eth.balanceWollo}
                          continueApplication={!claimData.complete && claimData.started}
                          startApplication={!claimData.complete && !claimData.started}
                          buttonNextLabel={!eth.balanceWollo ? 'Back' : !claimData.complete && !claimData.started ? 'Claim Wollo' : 'Continue'}
                          onNext={eth.balanceWollo ? this.onSubmitBurn : this.onCloseClaim}
                          onBack={eth.balanceWollo ? this.onBack : null}
                      />
                  }
              </Fragment>

              <Modal
                  visible={modal.visible}
                  message={modal.message}
                  estimatedCost={estimatedCost}
                  onConfirm={this.onConfirmedSubmitBurn}
                  onCancel={this.closeModal}
              />
              {!this.state.clickedClose ? (
                  <Progress
                      active={loading !== null && !claimData.complete && !errorBurning}
                      complete={claimData.complete}
                      title={claimData.complete ? 'Congrats' : 'Claim progress'}
                      error={errorBurning}
                      text={claimData.complete ? `Congrats! You are now the owner of ${eth.balanceWollo} Wollo, you rock.` : loading}
                      // buttonLabel={claimData.complete || errorBurning ? 'Next' : null}
                      buttonLabel={'Next'}
                      onPress={claimData.complete ? this.onCompleteClaim : this.closeProgress}
                  />
              ) : null}
          </Fragment>
      );
  }
}

export default connect(
    ({eth, claimData, web3, events, contract, keys}) => ({
        eth,
        claimData,
        contract: contract.instance,
        transactionHash: events.transactionHash,
        web3: web3.instance,
        loading: events.loading,
        errorBurning: events.error,
        publicKey: keys.publicKey,
    }), {
        getGasPrice,
        userLogin,
        initWeb3,
        transfer,
        burn,
        clearClaimData,
        loadWallet
    },
)(ClaimICO);
