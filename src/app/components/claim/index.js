import React, {Component} from 'react';
import {
    View,
} from 'react-native';
import {connect} from 'react-redux';
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
import {userLogin} from '../../actions/eth';
import {transfer, burn, init} from '../../actions/contract';

class Claim extends Component {
  state = {
      step: 1,
      error: null,
      burnInput: '5',
      mnemonic: Config.MNEMONIC,
      pk: Config.PK,
      errorImportingAccount: false,
      loading: 'Loading Ethereum Interface',
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
          console.log('componentWillReceiveProps');
          console.log(nextProps.localStorage);

          if (Object.keys(nextProps.localStorage).length === 0 && nextProps.localStorage.constructor === Object) {
              this.setState({loading: null, step: 1});
          }
      }

      if (this.props.localStorage) {
          if (nextProps.user.coinbase) {
              if (nextProps.user.balance) {
                  this.setState({step: 5, loading: null});
              }
          }

          if (this.props.localStorage.complete && this.props.localStorage.stellar) {
              this.setState({step: 6});
          }
      }
  }

  onImportKey = () => {
      const {mnemonic, pk} = this.state;
      if (pk === '' || mnemonic === '') {
          this.setState({errorImportingAccount: true});
          return;
      }

      this.setState({loading: 'Loading your Ethereum account'});

      let publicKey = pk;
      if (pk.substr(0, 2) !== '0x') {
          publicKey = `0x${pk}`;
      }
      this.props.userLogin(mnemonic, publicKey);
  }

  onChangeStep = (step) => {
      this.setState({step});
  }

  onSubmitBurn = async () => {
      const {localStorage, contract, user} = this.props;
      const {burnInput} = this.state;
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
          const estimatedGas = await contract.instance.methods.burn(burnInput).estimateGas({from: user.coinbase});
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
      this.props.burn(Number(this.state.burnInput));
  }

  closeModal = () => {
      this.setState({
          modal: {
              visible: false,
              message: ''
          }
      });
  }

  onChangeMnemonic = (mnemonic) => {
      this.setState({mnemonic});
  }
  onChangePk = (pk) => {
      this.setState({pk});
  }

  render () {

      const {
          estimatedCost,
          mnemonic,
          pk,
          errorImportingAccount,
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
          errorBurning,
      } = this.props;

      console.log(this.state.loading);

      if (!web3 || !contract.instance || !localStorage || this.state.loading !== null) {
          return (
              <View style={styles.containerLoading}>
                  <Loader isLoading message={this.state.loading} />
              </View>
          );
      }

      const stellar = (localStorage.stellar && localStorage.started) ? localStorage.stellar : (user.stellar ? user.stellar : null);
      const tx = localStorage.transactionHash || events.get('transactionHash');

      return (
          <View style={styles.container}>
              <Logo />
              <View style={styles.container}>
                  {step === 1 && <Step1 onNext={() => this.onChangeStep(2)} onBack={this.props.onCloseClaim} />}
                  {step === 2 && <Step2 onNext={() => this.onChangeStep(3)} onBack={() => this.onChangeStep(1)} />}
                  {step === 3 && <Step3 onNext={() => this.onChangeStep(4)} onBack={() => this.onChangeStep(2)} />}
                  {step === 4 &&
                      <Step4
                          onNext={this.onImportKey}
                          onBack={() => this.onChangeStep(3)}
                          error={errorImportingAccount}
                          pk={pk}
                          mnemonic={mnemonic}
                          onChangeMnemonic={this.onChangeMnemonic}
                          onChangePk={this.onChangePk}
                      />
                  }

                  {step === 5 &&
                      <Step5
                          continueApplication={!localStorage.complete && localStorage.started}
                          startApplication={!localStorage.complete && !localStorage.started}
                          buttonNextLabel={!localStorage.complete && !localStorage.started ? 'Claim Wollo' : 'Continue'}
                          onNext={this.onSubmitBurn}
                          onBack={() => {
                              this.onChangeStep(1);
                          }}
                          userBalance={user.balance}
                      />
                  }

                  {localStorage.complete && stellar &&
                      <Step6
                          userBalance={user.balance}
                          stellar={stellar}
                          tx={tx}
                      />
                  }
              </View>

              <Modal
                  visible={modal.visible}
                  message={modal.message}
                  estimatedCost={estimatedCost}
                  onConfirm={this.onConfirmedSubmitBurn}
                  onCancel={this.closeModal}
              />

              <Progress
                  active={loading !== null && !localStorage.complete}
                  complete={localStorage.complete}
                  title="Claim progress"
                  error={errorBurning}
                  text={loading}
              />
          </View>
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
},
)(Claim);
