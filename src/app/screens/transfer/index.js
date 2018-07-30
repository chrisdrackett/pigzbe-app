import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {View} from 'react-native';
import styles from './styles';
import {
    strings,
    SCREEN_SEND
} from '../../constants';
import Button from '../../components/button';
import Payments from '../../components/payments';
import {loadPayments, wolloError} from '../../actions';
import Paragraph from '../../components/paragraph';
import StepModule from '../../components/step-module';

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
            <Fragment>
                <StepModule
                    title="Transfer"
                    icon="transfer"
                    error={error}
                    scroll={false}
                    paddingTop={payments.length ? 0 : 30}
                >
                    {payments.length ? (
                        <Payments
                            loading={loading}
                            balance={balance}
                            payments={payments}
                        />
                    ) : (
                        <Paragraph>
                            No transaction history
                        </Paragraph>
                    )}
                </StepModule>
                <View style={styles.button}>
                    <Button
                        label={strings.transferButtonLabel}
                        onPress={this.onTransfer}
                        disabled={!hasGas || !Number(balance)}
                    />
                </View>
            </Fragment>
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
