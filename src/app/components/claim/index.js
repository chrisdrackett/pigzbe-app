import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ScrollView, View} from 'react-native';
import {utils} from 'web3';
import Config from 'react-native-config';
import Logo from '../logo';
import styles from './styles';
import {
    Step1,
    Step2,
    Step3,
    Step4,
    Step5,
    Step6,
} from './steps';
import Loader from '../loader';
import Progress from '../progress';
import Modal from './modal';
import Container from '../container';
import {userLogin} from '../../actions/eth';
import {clearClaimData} from '../../actions/content';
import {transfer, burn, init} from '../../actions/contract';
import {isValidSeed} from '../../utils/web3';

const numTokensToBurn = balance => Config.NUM_TOKENS_TO_BURN || balance;

class Claim extends Component {
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
      this.props.init(Config.NETWORK);
  }

  componentWillReceiveProps(nextProps) {

      if (nextProps.localStorage && !this.props.localStorage) {
          console.log(nextProps.localStorage);

          if (Object.keys(nextProps.localStorage).length === 0 && nextProps.localStorage.constructor === Object) {
              this.setState({loading: null, step: 1});
          }
      }

      if (this.props.localStorage) {
          if (nextProps.user.coinbase && nextProps.user.balance) {
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
      const numTokens = numTokensToBurn(user.balance);

      console.log('contract.network', contract.network);
      console.log('user.balance', user.balance);
      console.log('numTokens', numTokens);

      if (localStorage.transactionHash && localStorage.value) {
          this.props.burn(Number(localStorage.value));
          return;
      }

      this.setState({
          modal: {
              visible: true,
              message: 'Please wait, estimating gas cost...',
          }
      });

      try {
          const gasPrice = await this.props.web3.eth.getGasPrice();
          const estimatedGas = await contract.instance.methods.burn(numTokens).estimateGas({from: user.coinbase});
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

      const numTokens = numTokensToBurn(this.props.user.balance);

      console.log('this.props.user.balance', this.props.user.balance);
      console.log('numTokens', numTokens);

      this.props.burn(Number(numTokens));
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

  confirmCopy = () => {
      const {user: {stellar}, onCompleteClaim} = this.props;
      this.props.clearClaimData();
      onCompleteClaim(stellar.sk);
  }

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

      console.log(JSON.stringify(localStorage, null, 2));

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
                      {step === 1 && <Step1 onNext={() => this.onChangeStep(2)} onBack={this.props.onCloseClaim} />}
                      {step === 2 && <Step2 onNext={() => this.onChangeStep(3)} onBack={() => this.onChangeStep(1)} />}
                      {step === 3 && <Step3 onNext={() => this.onChangeStep(4)} onBack={() => this.onChangeStep(2)} />}
                      {step === 4 &&
                      <Step4
                          onNext={this.onImportKey}
                          onBack={() => this.onChangeStep(3)}
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
                          tx={tx}
                          pk={pk}
                          userBalance={user.balance}
                          continueApplication={!localStorage.complete && localStorage.started}
                          startApplication={!localStorage.complete && !localStorage.started}
                          buttonNextLabel={!localStorage.complete && !localStorage.started ? 'Claim Wollo' : 'Continue'}
                          onNext={this.onSubmitBurn}
                          onBack={() => {
                              this.onChangeStep(1);
                          }}
                      />
                      }

                      {localStorage.complete && user.stellar &&
                      <Step6
                          userBalance={user.balance}
                          stellar={user.stellar}
                          tx={tx}
                          onNext={this.confirmCopy}
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
                          text={localStorage.complete ? `Congrats! You are now the owner of ${user.balance} Wollo, you rock.` : loading}
                          // buttonLabel={localStorage.complete || errorBurning ? 'Next' : null}
                          buttonLabel={'Next'}
                          onPress={this.closeProgress}
                      />
                  ) : null}
              </Container>
          </ScrollView>
      );
  }
}

export default connect(({user, web3, events, contract, content}) => ({
    user,
    events,
    contract,
    localStorage: content.get('localStorage'),
    web3: web3.instance,
    loading: events.get('loading'),
    errorBurning: events.get('error')
}), {
    userLogin,
    init,
    transfer,
    burn,
    clearClaimData,
},
)(Claim);
