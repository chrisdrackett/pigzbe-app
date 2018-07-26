import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ScrollView, View} from 'react-native';
import {utils} from 'web3';
import Config from 'react-native-config';
import Logo from '../../components/logo';
import styles from './styles';
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
import Container from '../../components/container';
import {userLogin} from '../../actions/eth';
import {refreshBalance} from '../../actions/wollo';
import {clearClaimData} from '../../actions/content';
import {transfer, burn, initWeb3} from '../../actions/contract';
import {isValidSeed} from '../../utils/web3';
import {SCREEN_BALANCE} from '../../constants';

export class ClaimICO extends Component {
  state = {
      step: 1,
      error: null,
      mnemonic: (__DEV__ && Config.MNEMONIC) || '',
      pk: (__DEV__ && Config.PK) || '',
      badAddress: false,
      badSeed: false,
      loading: 'Loading...',
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

      if (nextProps.localStorage && !this.props.localStorage) {
          if (Object.keys(nextProps.localStorage).length === 0 && nextProps.localStorage.constructor === Object) {
              this.setState({loading: null, step: 1});
          }
      }

      if (this.props.localStorage) {
          if (nextProps.user.coinbase && nextProps.user.balanceWollo) {
              this.setState({step: 5, loading: null});
          }

          if (this.props.localStorage.complete && this.props.localStorage.stellar) {
              this.setState({step: 6});
          }
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

  onChangeStep = (step) => {
      this.setState({step});
  }

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
          const gasPrice = await this.props.web3.eth.getGasPrice();
          const estimatedGas = await contract.instance.methods.burn(amountBurn).estimateGas({from: user.coinbase});

          this.setState({
              estimatedCost: `${utils.fromWei(String(estimatedGas * gasPrice), 'ether')} ETH`,
          });

          this.setState({
              modal: {
                  visible: true,
                  message: 'confirm'
              }
          });
      } catch (err) {
          console.log(err);
      }
  }

  onConfirmedSubmitBurn = () => {
      this.closeModal();

      this.props.burn(this.props.user.balanceWei);
  }

  closeModal = () => {
      this.setState({
          modal: {
              visible: false,
              message: ''
          }
      });
  }

  closeProgress = () => {
      this.setState({clickedClose: true});
  }

  onChangeMnemonic = (mnemonic) => {
      this.setState({mnemonic});
  }
  onChangePk = (pk) => {
      this.setState({pk});
  }

  onCloseClaim = () => {
      this.props.navigation.navigate(SCREEN_BALANCE);
  }

  onCompleteClaim = () => {
      this.props.clearClaimData();
      this.props.refreshBalance();
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

      // console.log(JSON.stringify(localStorage, null, 2));
      // console.log('errorBurning', errorBurning);

      if (!web3 || !contract.instance || !localStorage || this.state.loading !== null) {
          return (
              <Container style={styles.containerLoading}>
                  <Loader isLoading message={this.state.loading} />
              </Container>
          );
      }

      const tx = localStorage.transactionHash || events.get('transactionHash');

      return (
          <ScrollView bounces={false} style={{flex: 1}} contentContainerStyle={{flexGrow: 1}}>
              <Container>
                  <View style={styles.header}>
                      <Logo />
                  </View>
                  <Container>
                      {step === 1 && <Step1 onNext={this.onStep2} onBack={this.onCloseClaim} />}
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
                          onBack={user.balanceWollo ? this.onStep1 : null}
                      />
                      }
                  </Container>

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
              </Container>
          </ScrollView>
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
    errorBurning: events.get('error')
}), {
    userLogin,
    initWeb3,
    transfer,
    burn,
    clearClaimData,
    refreshBalance
},
)(ClaimICO);
