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
import {userLogin, getGasPrice} from '../../actions/eth';
import {loadWallet} from '../../actions/wollo';
import {clearClaimData} from '../../actions/content';
import {transfer, burn, initWeb3} from '../../actions/contract';
import {isValidSeed} from '../../utils/web3';
// import {SCREEN_BALANCE, SCREEN_CLAIM} from '../../constants';
import {SCREEN_BALANCE, SCREEN_SETTINGS} from '../../constants';

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
      // console.log('componentWillReceiveProps', nextProps);

      if (nextProps.localStorage && Object.keys(nextProps.localStorage).length === 0 && nextProps.localStorage.constructor === Object) {
          this.setState({loading: null, step: 1});
      }

      if (this.props.localStorage && nextProps.user.coinbase && nextProps.user.balanceWollo) {
          this.setState({step: 5, loading: null});
      }
  }

  onImportKey = async () => {
      const {mnemonic, pk} = this.state;

      const badAddress = pk.trim() === '' || !utils.isAddress(pk);
      const badSeed = mnemonic.trim() === '' || !isValidSeed(mnemonic);
      this.setState({badAddress, badSeed});

      if (badAddress || badSeed) {
          return;
      }

      let publicKey = pk;
      if (pk.substr(0, 2) !== '0x') {
          publicKey = `0x${pk}`;
      }

      const success = await this.props.userLogin(mnemonic, publicKey);

      if (success) {
          this.setState({loading: 'Loading your Ethereum account'});
      }
  }

  onChangeStep = step => this.setState({step})

  onSubmitBurn = async () => {
      const {localStorage, contract, user} = this.props;

      if (localStorage.transactionHash && localStorage.value) {
          this.props.burn(localStorage.value);
          return;
      }

      this.setState({
          modal: {
              visible: true,
              message: 'Please wait, estimating gas cost...',
          }
      });

      try {
          const amountBurn = user.balanceWei;
          // const gasPrice = await this.props.web3.eth.getGasPrice();
          const gasPrice = await this.props.getGasPrice();
          const estimatedGas = await contract.instance.methods.burn(amountBurn).estimateGas({from: user.coinbase});
          const estimatedCost = utils.fromWei(String(estimatedGas * gasPrice), 'ether');

          let estimatedCostUSD = '';
          try {
              const exchange = await (await fetch('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD,GBP,EUR,JPY')).json();
              estimatedCostUSD = (exchange.USD * Number(estimatedCost)).toFixed(2);
          } catch (e) {}

          this.setState({
              estimatedCost: `${estimatedCost} ETH ($${estimatedCostUSD})`,
          });

          this.setState({
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

      this.props.burn(this.props.user.balanceWei);
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

  onCloseClaim = () => this.props.navigation.navigate(SCREEN_BALANCE)

  // onBack = () => this.props.navigation.navigate(SCREEN_CLAIM)
  onBack = () => this.props.navigation.navigate(SCREEN_SETTINGS)

  onCompleteClaim = () => {
      this.props.clearClaimData();
      this.props.loadWallet();
      this.props.navigation.navigate(SCREEN_BALANCE);
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
          user,
          events,
          web3,
          localStorage,
          errorBurning
      } = this.props;

      // console.log(JSON.stringify({
      //     loading,
      //     contract,
      //     user,
      //     events,
      //     // web3,
      //     localStorage,
      //     errorBurning
      // }, null, 2));
      // console.log('errorBurning', errorBurning);

      console.log('===> step', step);
      console.log('web3', web3);
      console.log('contract.instance', contract.instance);
      console.log('localStorage', localStorage);
      console.log('this.state.loading', this.state.loading);

      if (!web3 || !contract.instance || !localStorage || this.state.loading !== null) {
          return (
              <Loader loading message={this.state.loading} />
          );
      }

      const tx = localStorage.transactionHash || events.get('transactionHash');

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
                          error={errorBurning || localStorage.error}
                          tx={tx}
                          pk={pk}
                          userBalance={user.balanceWollo}
                          continueApplication={!localStorage.complete && localStorage.started}
                          startApplication={!localStorage.complete && !localStorage.started}
                          buttonNextLabel={!user.balanceWollo ? 'Back' : !localStorage.complete && !localStorage.started ? 'Claim Wollo' : 'Continue'}
                          onNext={user.balanceWollo ? this.onSubmitBurn : this.onCloseClaim}
                          onBack={user.balanceWollo ? this.onBack : null}
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
                      active={loading !== null && !localStorage.complete && !errorBurning}
                      complete={localStorage.complete}
                      title={localStorage.complete ? 'Congrats' : 'Claim progress'}
                      error={errorBurning}
                      text={localStorage.complete ? `Congrats! You are now the owner of ${user.balanceWollo} Wollo, you rock.` : loading}
                      // buttonLabel={localStorage.complete || errorBurning ? 'Next' : null}
                      buttonLabel={'Next'}
                      onPress={localStorage.complete ? this.onCompleteClaim : this.closeProgress}
                  />
              ) : null}
          </Fragment>
      );
  }
}

export default connect(({config, user, web3, events, contract, content}) => ({
    config,
    user,
    events,
    contract,
    localStorage: content.get('localStorage'),
    web3: web3.instance,
    loading: events.get('loading'),
    errorBurning: events.get('error'),
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
