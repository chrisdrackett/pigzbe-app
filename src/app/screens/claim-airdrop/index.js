import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {utils} from 'web3';
import Config from 'react-native-config';
import Step1 from './steps/step1';
import Step2 from './steps/step2';
import Step3 from './steps/step3';
import Loader from '../../components/loader';
import Progress from '../../components/progress';
import GasModal from '../../components/gas-modal';
import {loadWallet} from '../../actions/wollo';
import {SCREEN_DASHBOARD, SCREEN_SETTINGS} from '../../constants';
import {
    claimStart,
    transfer,
    burn,
    initWeb3,
    clearClaimData,
    userLoginPrivateKey,
    getGasPrice
} from '../../actions';

export class ClaimAirdrop extends Component {
  state = {
      step: 0,
      error: null,
      privateKey: (__DEV__ && Config.PRIVATE_KEY) || '',
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
      this.props.claimStart('airdrop');
      this.props.initWeb3();
  }

  componentWillReceiveProps(nextProps) {
      if (!nextProps.data.loaded) {
          return;
      }

      const unfinished = nextProps.eth.coinbase && nextProps.eth.balanceWollo;
      const hasError = nextProps.data.error;

      if (unfinished || hasError) {
          this.setState({step: 3, loading: null});
      } else {
          this.setState({step: 1, loading: null});
      }
  }

  onImportKey = async () => {
      const {pk, privateKey} = this.state;

      const badAddress = pk.trim() === '' || !utils.isAddress(pk.trim());
      this.setState({badAddress});

      if (badAddress) {
          return;
      }

      let publicKey = pk.trim();
      if (pk.substr(0, 2) !== '0x') {
          publicKey = `0x${pk}`;
      }

      const success = await this.props.userLoginPrivateKey(privateKey, publicKey);

      if (success) {
          this.setState({loading: 'Loading your Ethereum account'});
      }
  }

  onChangeStep = step => this.setState({step})

  onSubmitBurn = async () => {
      const {data, contract, eth} = this.props;

      if (data.transactionHash && data.value) {
          this.props.burn(data.value);
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

  onChangePrivateKey = privateKey => this.setState({privateKey})

  onChangePk = pk => this.setState({pk})

  onCloseClaim = () => this.props.navigation.navigate(SCREEN_DASHBOARD)

  // onBack = () => this.props.navigation.navigate(SCREEN_CLAIM)
  onBack = () => this.props.navigation.navigate(SCREEN_SETTINGS)

  onCompleteClaim = () => {
      this.props.clearClaimData();
      this.props.loadWallet();
      this.props.navigation.navigate(SCREEN_DASHBOARD);
  }

  onStep1 = () => this.onChangeStep(1)
  onStep2 = () => this.onChangeStep(2)
  onStep3 = () => this.onChangeStep(3)

  render () {

      const {
          estimatedCost,
          privateKey,
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
          data,
          errorBurning,
          publicKey
      } = this.props;

      console.log('===> step', step);
      console.log('web3', web3);
      console.log('contract', contract);
      console.log('data', data);
      console.log('this.state.loading', this.state.loading);

      if (!web3 || !contract || !data.loaded || this.state.loading !== null) {
          return (
              <Loader loading message={this.state.loading} />
          );
      }

      const tx = data.transactionHash || transactionHash;

      return (
          <Fragment>
              <Fragment>
                  {step === 1 && <Step1 onNext={this.onStep2} onBack={this.onBack} />}
                  {step === 2 &&
                      <Step2
                          onNext={this.onImportKey}
                          onBack={this.onStep3}
                          badAddress={badAddress}
                          badSeed={badSeed}
                          pk={pk}
                          privateKey={privateKey}
                          onChangePrivateKey={this.onChangePrivateKey}
                          onChangePk={this.onChangePk}
                      />
                  }
                  {step === 3 &&
                      <Step3
                          error={errorBurning || data.error}
                          tx={tx}
                          pk={pk}
                          stellarPK={publicKey}
                          userBalance={eth.balanceWollo}
                          continueApplication={!data.complete && data.started}
                          startApplication={!data.complete && !data.started}
                          buttonNextLabel={!eth.balanceWollo ? 'Back' : !data.complete && !data.started ? 'Claim Wollo' : 'Continue'}
                          onNext={eth.balanceWollo ? this.onSubmitBurn : this.onCloseClaim}
                          onBack={eth.balanceWollo ? this.onBack : null}
                      />
                  }
              </Fragment>

              <GasModal
                  visible={modal.visible}
                  message={modal.message}
                  estimatedCost={estimatedCost}
                  onConfirm={this.onConfirmedSubmitBurn}
                  onCancel={this.closeModal}
              />
              {!this.state.clickedClose ? (
                  <Progress
                      active={loading !== null && !data.complete && !errorBurning}
                      complete={data.complete}
                      title={data.complete ? 'Congrats' : 'Claim progress'}
                      error={errorBurning}
                      text={data.complete ? `Congrats! You are now the owner of ${eth.balanceWollo} Wollo, you rock.` : loading}
                      // buttonLabel={data.complete || errorBurning ? 'Next' : null}
                      buttonLabel={'Next'}
                      onPress={data.complete ? this.onCompleteClaim : this.closeProgress}
                  />
              ) : null}
          </Fragment>
      );
  }
}

export default connect(
    ({keys, claim: {claims: {airdrop: {eth, data, web3, events, contract}}}}) => ({
        eth,
        data,
        contract: contract.instance,
        transactionHash: events.transactionHash,
        web3: web3.instance,
        loading: events.loading,
        errorBurning: events.error,
        publicKey: keys.publicKey,
    }), {
        getGasPrice,
        userLoginPrivateKey,
        initWeb3,
        transfer,
        burn,
        clearClaimData,
        loadWallet,
        claimStart,
    },
)(ClaimAirdrop);
