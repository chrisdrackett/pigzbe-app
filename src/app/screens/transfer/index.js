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
            <StepModule
                title="Transfer"
                icon="transfer"
                scroll={false}
                error={error}
                pad
            >
                <Fragment>
                    <Payments
                        loading={loading}
                        balance={balance}
                        payments={payments}
                    />
                    <View style={styles.button}>
                        <Button
                            secondary
                            label={strings.transferButtonLabel}
                            onPress={this.onTransfer}
                            disabled={!hasGas}
                        />
                    </View>
                </Fragment>
            </StepModule>
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
