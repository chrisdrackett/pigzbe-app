import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    Text,
    View
} from 'react-native';
import Avatar from '../avatar';
import styles from './styles';
import {
    strings,
    SCREEN_ESCROW,
    COINS,
    COIN_DPS
} from '../../constants';
import ConvertBalance from '../convert-balance';
import BalanceGraph from '../balance-graph';
import Loader from '../loader';
import BaseView from '../base-view';
import Pig from '../pig';
import Button from '../button';
import Wollo from '../wollo';
import {getExchange} from '../../actions/coins';

class Balance extends Component {

    async componentWillMount() {
        this.props.dispatch(getExchange());
    }

    render () {
        const {
            exchange,
            error,
            balance,
            baseCurrency,
            escrow,
            name,
            image,
            navigation
        } = this.props;

        if (!exchange && !error) {
            return <Loader isLoading />;
        }

        return (
            <BaseView showSettings navigation={navigation} scrollViewStyle={styles.container} error={error}>
                <Avatar image={image}/>
                <Text style={styles.welcome}>{strings.walletGreeting} {name}</Text>
                <Wollo balance={balance}/>
                <Pig style={styles.pig}/>
                <BalanceGraph balance={balance} exchange={exchange} baseCurrency={baseCurrency}/>
                <ConvertBalance coins={COINS.filter(c => c !== baseCurrency)} exchange={exchange} balance={balance} dps={COIN_DPS}/>
                {escrow ? (
                    <View style={styles.escrow}>
                        <Button
                            outline
                            label={'Escrow account'}
                            onPress={() => navigation.navigate(SCREEN_ESCROW)}
                        />
                    </View>
                ) : null}
            </BaseView>
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
        name: state.profile.name,
        image: state.profile.image
    })
)(Balance);
