import React, {Component} from 'react';
import {connect} from 'react-redux';
import {loadPayments} from '../../actions';
import Payment from './payment';
import ScrollList from '../scroll-list';

class Payments extends Component {

    async componentWillMount() {
        this.props.dispatch(loadPayments());
    }

    render () {
        const {
            payments,
            loading
        } = this.props;

        console.log('payments', payments);

        return (
            <ScrollList
                title={'Transfer History'}
                items={payments}
                ItemComponent={Payment}
                loading={loading}
                loaderMessage={'Loading payments'}
            />
        );
    }
}

// export for test
export const PaymentsComponent = Payments;

export default connect(
    state => ({
        loading: state.wollo.loading,
        balance: state.wollo.balance,
        payments: state.wollo.payments
    })
)(Payments);
