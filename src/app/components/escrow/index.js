import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Text, View} from 'react-native';
import styles from './styles';
import Loader from '../loader';
import Logo from '../logo';
import Pig from '../pig';
import Transaction from './transaction';
import Wollo from '../wollo';
import Button from '../button';
import {strings, SCREEN_BALANCE} from '../../constants';
import {loadEscrowAccount, validateTx} from '../../actions';
import ScrollList from '../scroll-list';
import Footer from '../footer';

class Escrow extends Component {
    async componentDidMount() {
        const {dispatch, transactions} = this.props;

        await dispatch(loadEscrowAccount());

        for (const transaction of transactions) {
            await dispatch(validateTx(transaction.xdr));
        }
    }

    updateMessages() {
    }

    render() {
        const {
            navigation,
            balance,
            transactions,
            submitting
        } = this.props;

        // console.log(JSON.stringify(this.props, null, 2));

        return (
            <View style={styles.container}>
                <View style={styles.containerHeader}>
                    <Logo/>
                    <Text style={styles.title}>
                        {strings.escrowTitle}
                    </Text>
                    <Wollo balance={balance}/>
                    <Pig/>
                </View>
                <ScrollList
                    border
                    items={transactions}
                    ItemComponent={Transaction}
                />
                <Footer>
                    <Button
                        outline
                        label={strings.escrowBackButtonLabel}
                        onPress={() => navigation.navigate(SCREEN_BALANCE)}
                    />
                </Footer>
                <Loader
                    isLoading={submitting}
                    message={strings.escrowSubmitting}
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
