import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import styles from './styles';
import {
    strings,
    SCREEN_ESCROW,
    COINS,
    COIN_DPS
} from '../../constants';
import ConvertBalance from '../../components/convert-balance';
import BalanceGraph from '../../components/balance-graph';
import Loader from '../../components/loader';
import BaseView from '../../components/base-view';
import Pig from '../../components/pig';
import Button from '../../components/button';
import Wollo from '../../components/wollo';
import Footer from '../../components/footer';
import {getExchange} from '../../actions/coins';

class Balance extends Component {

    async componentWillMount() {
        console.log('Balance componentWillMount');
        this.props.dispatch(getExchange());
    }

    render () {
        const {
            exchange,
            error,
            balance,
            baseCurrency,
            escrow,
            navigation
        } = this.props;

        if (!exchange && !error) {
            return <Loader isLoading />;
        }

        const coins = COINS.filter(c => c !== baseCurrency && c !== 'GOLD');

        return (
            <Fragment>
                <BaseView showSettings navigation={navigation} scrollViewStyle={styles.container} error={error}>
                    <Wollo balance={balance}/>
                    <Pig style={styles.pig}/>
                    <BalanceGraph balance={balance} exchange={exchange} baseCurrency={baseCurrency}/>
                    <ConvertBalance coins={coins} exchange={exchange} balance={balance} dps={COIN_DPS}/>
                </BaseView>
                <Footer>
                    {escrow ? (
                        <Button
                            outline
                            label={strings.escrowButtonLabel}
                            onPress={() => navigation.navigate(SCREEN_ESCROW)}
                        />
                    ) : null}
                </Footer>
            </Fragment>
        );
    }
}

// export for test
export const BalanceComponent = Balance;

export default connect(
    state => ({
        error: state.coins.error,
        exchange: state.coins.exchange,
        balance: state.wollo.balance,
        baseCurrency: state.wollo.baseCurrency,
        escrow: state.escrow.escrowPublicKey,
    })
)(Balance);
