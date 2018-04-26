import React, {Component} from 'react';
import {
    View,
    Text
} from 'react-native';
import styles from './styles';
import {
    strings
} from '../../constants';
import openURL from '../../utils/open-url';
import Coin from '../coin-compare';
import Loader from '../loader';

const coins = ['xlm', 'btc', 'eth', 'eur', 'gbp', 'jpy'];

export default class ConvertBalance extends Component {

  state = {
      exchange: null
  }

  componentDidMount() {
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

  render() {
      const {exchange} = this.state;
      const {balance} = this.props;

      if (!exchange) {
          return <Loader isLoading />;
      }

      return (
          <View style={styles.container}>
              <Text style={styles.title}>{strings.walletConversionTitle}</Text>
              <Text
                  style={styles.label}
                  onPress={() => openURL(strings.walletConversionCreditUrl)}>
                  {strings.walletConversionCreditLabel}
              </Text>
              <View style={styles.containerCoins}>
                  {coins.map(c => <Coin key={c} coin={c} value={exchange[c.toUpperCase()] * balance}/>)}
              </View>
          </View>
      );
  }
}
