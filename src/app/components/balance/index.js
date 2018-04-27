import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    Text,
    TouchableOpacity,
    View,
    Image,
    ScrollView
} from 'react-native';
import Avatar from '../avatar';
import styles from './styles';
import {
    strings,
    SCREEN_PROFILE
} from '../../constants';
import ConvertBalance from '../convert-balance';
import Logo from '../logo';
import Graph from '../balance-graph';
import Loader from '../loader';

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
          <ScrollView contentContainerStyle={styles.container}>
              <Logo/>
              <Avatar image={image}/>
              <Text style={styles.welcome}>{strings.walletGreeting} {name}</Text>
              <View style={styles.balanceContainer}>
                  <Image style={styles.currencyLogo} source={require('../../../../assets/images/currency_logo.png')} />
                  <Text style={styles.balance}>{Number(balance).toFixed(2)}</Text>
              </View>

              <Text style={styles.label}>{strings.walletBalance}</Text>
              <Image style={styles.pig} source={require('../../../../assets/images/pig.png')} />
              <Graph balance={balance} balanceConvert={balance * exchange.USD}/>
              <ConvertBalance coins={coins.filter(c => c !== 'usd')} exchange={exchange} balance={balance}/>
              <TouchableOpacity
                  style={styles.settings}
                  onPress={() => navigation.navigate(SCREEN_PROFILE)}
              >
                  <Image style={styles.settingsIcon} source={require('../../../../assets/images/settings-icon.png')} />
              </TouchableOpacity>
          </ScrollView>
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
