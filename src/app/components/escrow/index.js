import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    Text,
    View,
    FlatList,
    ScrollView
} from 'react-native';
import styles from './styles';
import Loader from '../loader';
import Logo from '../logo';
import Pig from '../pig';
import Transaction from './transaction';
import {Wollo} from '../balance';
import Button from '../button';
import isDesktop from '../../utils/is-desktop';
import {SCREEN_BALANCE} from '../../constants';
import {
    loadEscrowAccount,
    validateTransaction
} from '../../actions';

class Escrow extends Component {
    async componentDidMount() {
        const {dispatch, transactions} = this.props;

        await dispatch(loadEscrowAccount());

        for (const transaction of transactions) {
            await dispatch(validateTransaction(transaction.xdr));
        }
    }

    updateMessages() {
    }

    render() {
        const {
            error,
            navigation,
            balance,
            transactions,
            submitting
        } = this.props;

        console.log(JSON.stringify(this.props, null, 2));

        return (
            <View style={styles.container}>
                <View style={styles.containerHeader}>
                    <Logo/>
                    <Text style={styles.title}>
                        Your Escrow Account
                    </Text>
                    <Wollo balance={balance}/>
                    <Pig/>
                </View>
                <View style={styles.containerBody}>
                    <View style={styles.border}/>
                    {isDesktop ? (
                        <ScrollView style={{width: '100%'}}>
                            {transactions.map((item, i) => (
                                <Transaction key={i} {...item}/>
                            ))}
                        </ScrollView>
                    ) : (
                        <FlatList
                            data={transactions}
                            renderItem={({item}) => (
                                <Transaction {...item}/>
                            )}
                        />
                    )}
                </View>
                <View style={styles.button}>
                    <Button
                        label={'Back'}
                        onPress={() => navigation.navigate(SCREEN_BALANCE)}
                    />
                </View>
                <Loader
                    isLoading={submitting}
                    transparent
                />
            </View>
        );
    }
}

export default connect(state => ({
    balance: state.escrow.balance,
    transactions: state.escrow.transactions,
    loading: state.escrow.loading,
    error: state.escrow.error,
    submitting: state.escrow.submitting
}))(Escrow);
