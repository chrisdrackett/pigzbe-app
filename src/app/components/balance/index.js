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
    strings
} from '../../constants';
import ConvertBalance from '../convert-balance';
import Graph from '../balance-graph';
import Loader from '../loader';
import BaseView from '../base-view';
import Pig from '../pig';

const coins = ['xlm', 'btc', 'eth', 'eur', 'usd', 'jpy', 'gbp'];

class Balance extends Component {

  state = {
      exchange: null
  }

  componentWillMount() {
      this.getExhange();
  }

  getExhange = async () => {
      const values = await (await fetch(`https://min-api.cryptocompare.com/data/price?fsym=XLM&tsyms=${coins.toString().toUpperCase()}`, {
          method: 'GET'
      })).json();

      this.setState({
          exchange: {...values}
      });
  }

  render () {
      const {exchange} = this.state;
      const {
          balance,
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
              <View style={styles.balanceContainer}>
                  <Image style={styles.currencyLogo} source={require('./images/currency_logo.png')} />
                  <Text style={styles.balance}>{Number(balance).toFixed(2)}</Text>
              </View>

              <Text style={styles.label}>{strings.walletBalance}</Text>
              <Pig style={styles.pig}/>
              <Graph balance={balance} balanceConvert={balance * exchange.USD}/>
              <ConvertBalance coins={coins.filter(c => c !== 'usd')} exchange={exchange} balance={balance}/>
          </BaseView>
      );
  }
}

// export for test
export const BalanceComponent = Balance;

export default connect(
    state => ({
        balance: state.wollo.balance,
        name: state.profile.name,
        image: state.profile.image
    })
)(Balance);
