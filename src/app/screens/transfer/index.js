import React, {Component} from 'react';
import {connect} from 'react-redux';
import styles from './styles';
import {
    strings,
    SCREEN_SEND
} from '../../constants';
import BaseView from '../../components/base-view';
import Pig from '../../components/pig';
import Button from '../../components/button';
import Wollo from '../../components/wollo';
import Payments from '../../components/payments';
import Footer from '../../components/footer';
import {loadPayments, wolloError} from '../../actions';

export class Transfer extends Component {
    async componentWillMount() {
        this.props.dispatch(loadPayments());
    }

    onTransfer = () => {
        const {hasGas, balanceXLM, minXLM} = this.props;

        if (!hasGas) {
            const errMsg = `${strings.transferErrorNoGas} (Balance ${balanceXLM}XLM. Required ${minXLM}XLM)`;
            this.props.dispatch(wolloError(new Error(errMsg)));
            return;
        }
        this.props.navigation.navigate(SCREEN_SEND);
    }

    render() {
        const {error, balance, hasGas, loading, payments} = this.props;

        return (
            <BaseView scrollViewStyle={styles.container} error={error}>
                <Wollo balance={balance}/>
                <Pig style={styles.pig}/>
                <Payments
                    loading={loading}
                    balance={balance}
                    payments={payments}
                />
                <Footer>
                    <Button
                        label={strings.transferButtonLabel}
                        onPress={this.onTransfer}
                        disabled={!hasGas}
                        outline
                    />
                </Footer>
            </BaseView>
        );
    }
}

export default connect(
    state => ({
        error: state.wollo.error,
        balance: state.wollo.balance,
        balanceXLM: state.wollo.balanceXLM,
        minXLM: state.wollo.minXLM,
        hasGas: state.wollo.hasGas,
        loading: state.wollo.loading,
        payments: state.wollo.payments
    })
)(Transfer);
