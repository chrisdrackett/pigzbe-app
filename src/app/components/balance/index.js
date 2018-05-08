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
    SCREEN_ESCROW,
    COINS,
    COIN_DPS,
    ASSET_CODE
} from '../../constants';
import ConvertBalance from '../convert-balance';
import BalanceGraph from '../balance-graph';
import Loader from '../loader';
import BaseView from '../base-view';
import Pig from '../pig';
import Button from '../button';
import Alert from '../alert';
import moneyFormat from '../../utils/money-format';

export const Wollo = ({balance}) => (
    <View style={styles.wolloContainer}>
        <View style={styles.balanceContainer}>
            <Image style={styles.currencyLogo} source={require('./images/currency_logo.png')} />
            <Text style={styles.balance}>{moneyFormat(balance, COIN_DPS[ASSET_CODE])}</Text>
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
          const values = await (await fetch(`https://min-api.cryptocompare.com/data/price?fsym=XLM&tsyms=${COINS.toString()}`, {
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
          baseCurrency,
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
              <BalanceGraph balance={balance} balanceConvert={balance * exchange[baseCurrency]} baseCurrency={baseCurrency}/>
              <ConvertBalance coins={COINS.filter(c => c !== baseCurrency)} exchange={exchange} balance={balance} dps={COIN_DPS}/>
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
        baseCurrency: state.wollo.baseCurrency,
        escrow: state.escrow.escrowPublicKey,
        name: state.profile.name,
        image: state.profile.image
    })
)(Balance);
