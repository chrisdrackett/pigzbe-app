import React, {Component, Fragment} from 'react';
import {
    Text,
    View,
    Modal,
    Linking,
} from 'react-native';
import {connect} from 'react-redux';
import {utils} from 'web3';
import Button from '../button';
import TextInput from '../text-input';
import Logo from '../logo';
import styles from './styles';
import Steps from './steps';
import Progress from '../progress';
import {clear} from '../../utils/storage';

import {userLogin} from '../../actions/eth';
import {transfer, burn, changeNetwork} from '../../actions/contract';
import {checkUserCache} from '../../actions/eth';
import {loadLocalStorage} from '../../actions/content';

class Claim extends Component {
  state = {
      step: 0,
      error: null,
      burnInput: '5',
      mnemonic: 'elephant merit raven monkey path outer paddle bounce exist fringe pet dry',
      pk: '0x798D23d6a84b2EF7d23c4A25735ED55B72072c24',
      errorImportingAccount: false,
      modal: {
          visible: false,
          message: '',
      },
      estimatedCost: null,
  }

  componentWillMount() {
      // TODO: check if the process has already started and jump steps
      //

      // clear('burning');

      this.props.changeNetwork(process.env.NODE_ENV || 'ropsten');

  }

  componentWillReceiveProps(nextProps) {
      console.log('!!!!!');
      if (nextProps.contract.instance && !this.props.contract.instance) {
          this.props.loadLocalStorage();
      }
      if (nextProps.localStorage && !this.props.localStorage) {
          nextProps.checkUserCache();
      }
      console.log(nextProps.user);
      console.log(this.props.localStorage.complete);
      console.log(this.props.localStorage.started);
      if (nextProps.user.coinbase && !this.props.localStorage.complete && this.props.localStorage.started && this.state.step <= 4) {
          this.setState({step: 5});
      }
  }

  onImportKey = () => {
      const {mnemonic, pk} = this.state;
      if (pk === '' || mnemonic === '') {
          this.setState({errorImportingAccount: true});
          return;
      }

      let publicKey = pk;
      if (pk.substr(0, 2) !== '0x') {
          publicKey = `0x${pk}`;
      }
      this.props.userLogin(mnemonic, publicKey);
      this.setState({step: 5});
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
      } = this.props;

      console.log(localStorage);

      const stellar = (localStorage.stellar && localStorage.started) ? localStorage.stellar : (user.stellar ? user.stellar : null);
      const tx = localStorage.transactionHash || events.get('transactionHash');

      console.log(loading);

      return (
          <View style={styles.containerBody}>
              {step < 4 &&
                  <Steps step={step} onChangeStep={this.onChangeStep}/>
              }
              {step === 4 && web3 && contract.instance &&
                  <View style={styles.containerBodySteps}>
                      <Logo />
                      <Text style={styles.title}>Import your Eidoo wallet</Text>
                      <Text style={styles.subtitle}>We're almost there! Enter your Eidoo wallet address and the 12 word seed below and lets claim.</Text>
                      <View style={styles.containerBody}>
                          <TextInput
                              error={!!errorImportingAccount}
                              value={pk}
                              placeholder="Your Eidoo wallet address"
                              onChangeText={pkText => this.setState({pk: pkText})}
                          />
                          <TextInput
                              error={!!errorImportingAccount}
                              value={mnemonic}
                              placeholder="Your 12 word seed, you must include spaces"
                              onChangeText={mnemonicText => this.setState({mnemonic: mnemonicText})}
                          />
                      </View>
                      <View style={styles.containerBody}>
                          <Button
                              label="Next"
                              disabled={!(this.state.mnemonic || this.state.pk)}
                              onPress={this.onImportKey}
                          />
                          <Button
                              label="Back"
                              style=""
                              secondary
                              onPress={() => {
                                  this.setState({step: 2});
                              }}
                          />
                      </View>
                  </View>
              }

              {step === 5 &&
                  <View style={styles.containerBodySteps}>
                      <Logo />
                      <Text style={styles.title}>Claim your Wollo</Text>
                      <Text style={styles.subtitle}>You have {user.balance} ERC20 Tokens in your Eidoo account.</Text>
                      <Text style={styles.subtitle}>Tap Claim Wollo bellow to convert your tokens to {user.balance} Wollo and create your Pigzbe wallet.</Text>
                      <View style={styles.containerBody}>
                          <Button
                              label="Claim Wollo"
                              onPress={this.onSubmitBurn}
                          />
                          <Button
                              label="Back"
                              style=""
                              secondary
                              onPress={() => {
                                  this.setState({step: 0});
                              }}
                          />
                      </View>
                  </View>
              }

              {step === 6 &&
                  <View style={styles.containerBodySteps}>
                      <Logo />
                      <Text style={styles.title}>Claim your Wollo</Text>
                      {!localStorage.complete && localStorage.started &&
                          <Fragment>
                              <Text style={styles.subtitle}>Your claim process has already started, click on Resume bellow to continue the process</Text>
                          </Fragment>
                      }
                      {!localStorage.complete && !localStorage.started &&
                          <Fragment>
                              <Text style={styles.subtitle}>You have {user.balance} ERC20 Tokens in your Eidoo account.</Text>
                              <Text style={styles.subtitle}>Tap Claim Wollo bellow to convert your tokens to {user.balance} Wollo and create your Pigzbe wallet.</Text>
                          </Fragment>
                      }
                      <View style={styles.containerBody}>
                          <Button
                              label={!localStorage.complete && !localStorage.started ? 'Claim Wollo' : 'Resume'}
                              onPress={this.onSubmitBurn}
                          />
                          <Button
                              label="Back"
                              style=""
                              secondary
                              onPress={() => {
                                  this.setState({step: 0});
                              }}
                          />
                      </View>
                  </View>
              }

              {localStorage.complete === 7 && stellar &&
                  <View style={styles.containerBodySteps}>
                      <Logo />
                      <Text style={styles.title}>Whoop!</Text>
                      <Text style={styles.subtitle}>Congrats! You are now the owner of {user.balance} Wollo, you rock.</Text>
                      <Text style={styles.subtitle}>Now, before you go any further, it's really IMPORTANT you make a secure copy of your NEW Pigzbe private and public keys just below.</Text>
                      <Text style={styles.subtitle}>This is your transaction hash from Ethereum: {tx} keep it safe.</Text>
                      <View>
                          <Text>Private Key</Text>
                          <Text style={styles.subtitle}>{stellar.sk}</Text>
                      </View>
                      <View>
                          <Text>Public Key</Text>
                          <Button
                              label={stellar.pk}
                              onPress={() => {
                                  Linking.openURL(`https://horizon-testnet.stellar.org/accounts/${stellar.pk}`);
                              }}
                          />
                          <Text style={styles.subtitle}>{stellar.pk}</Text>
                      </View>
                  </View>
              }

              <Modal animationType="slide" visible={modal.visible}>
                  <View style={styles.modalConfirm}>
                      {modal.message === 'confirm' &&
                          <Fragment>
                              <Text style={styles.modalTitle}>The estimated gas for this transaction is</Text>
                              <Text style={[styles.modalTitle, styles.modalTitleCost]}>{estimatedCost}</Text>
                              <Text>Are you sure you want to burn your tokens? They will be automatically converted into Stellar Wollo Tokens</Text>
                              <View>
                                  <Button
                                      label="Confirm"
                                      onPress={this.onConfirmedSubmitBurn}
                                  />
                                  <Button
                                      label="No"
                                      style=""
                                      secondary
                                      onPress={this.closeModal}
                                  />
                              </View>
                          </Fragment>
                      }

                      {modal.message !== 'confirm' && modal.message !== '' &&
                          <Fragment>
                              <Text>{modal.message}</Text>
                          </Fragment>
                      }
                  </View>
              </Modal>

              <Progress
                  active={loading !== null}
                  complete={localStorage.complete}
                  title="Claim progress"
                  // error={error}
                  text={loading}
                  buttonLabel={localStorage.complete ? 'Claiming complete' : null}
                  onPress={() => {
                      this.setState({step: 6});
                  }}
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
    loading: events.get('loading')
}), {
    userLogin,
    changeNetwork,
    checkUserCache,
    loadLocalStorage,
    transfer,
    burn,
},
)(Claim);
