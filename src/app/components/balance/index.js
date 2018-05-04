import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    Text,
    View,
    Image
} from 'react-native';
import Avatar from '../avatar';
import styles from './styles';
import {
    strings,
    SCREEN_ESCROW
} from '../../constants';
import ConvertBalance from '../convert-balance';
import BalanceGraph from '../balance-graph';
import Loader from '../loader';
import BaseView from '../base-view';
import Pig from '../pig';
import Button from '../button';
import Alert from '../alert';
import moneyFormat from '../../utils/money-format';

const coins = ['XLM', 'BTC', 'ETH', 'EUR', 'USD', 'JPY', 'GBP'];
const dps = {XLM: 7, BTC: 8, ETH: 8, EUR: 2, USD: 2, JPY: 0, GBP: 2};
// const BASE_CURRENCY = 'USD';

export const Wollo = ({balance}) => (
    <View style={styles.wolloContainer}>
        <View style={styles.balanceContainer}>
            <Image style={styles.currencyLogo} source={require('./images/currency_logo.png')} />
            <Text style={styles.balance}>{moneyFormat(balance)}</Text>
        </View>
        <Text style={styles.label}>{strings.walletBalance}</Text>
    </View>
);

class Balance extends Component {

  state = {
      exchange: null,
      error: null
  }

  componentWillMount() {
      this.getExchange();
  }

  getExchange = async () => {
      try {
          const values = await (await fetch(`https://min-api.cryptocompare.com/data/price?fsym=XLM&tsyms=${coins.toString()}`, {
              method: 'GET'
          })).json();

          this.setState({
              exchange: {...values},
              error: null
          });
      } catch (error) {
          this.setState({
              error: new Error('Network error')
          });
      }
  }

  render () {
      const {exchange, error} = this.state;
      const {
          balance,
          escrow,
          name,
          image,
          navigation
      } = this.props;

      if (!exchange) {
          return <Loader isLoading />;
      }

      return (
          <BaseView showSettings navigation={navigation} scrollViewStyle={styles.container}>
              <Avatar image={image}/>
              <Text style={styles.welcome}>{strings.walletGreeting} {name}</Text>
              <Wollo balance={balance}/>
              <Pig style={styles.pig}/>
              <BalanceGraph balance={balance} balanceConvert={balance * exchange.USD}/>
              <ConvertBalance coins={coins.filter(c => c !== 'USD')} exchange={exchange} balance={balance} dps={dps}/>
              {escrow ? (
                  <View style={styles.escrow}>
                      <Button
                          label={'Escrow account'}
                          onPress={() => navigation.navigate(SCREEN_ESCROW)}
                      />
                  </View>
              ) : null}
              <Alert
                  error={error}
              />
          </BaseView>
      );
  }
}

// export for test
export const BalanceComponent = Balance;

export default connect(
    state => ({
        balance: state.wollo.balance,
        escrow: state.escrow.escrowPublicKey,
        name: state.profile.name,
        image: state.profile.image
    })
)(Balance);
