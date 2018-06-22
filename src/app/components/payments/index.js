import React, {Component} from 'react';
import {connect} from 'react-redux';
import {loadPayments} from '../../actions';
import Payment from './payment';
import ScrollList from '../scroll-list';
import {strings} from '../../constants';

class Payments extends Component {

    async componentWillMount() {
        this.props.dispatch(loadPayments());
    }

    render () {
        const {
            payments,
            loading
        } = this.props;

        return (
            <ScrollList
                title={strings.transferHistory}
                items={payments}
                ItemComponent={Payment}
                loading={loading}
                loaderMessage={strings.transferHistoryLoading}
            />
        );
    }
}

export default connect(
    state => ({
        loading: state.wollo.loading,
        balance: state.wollo.balance,
        payments: state.wollo.payments
    })
)(Payments);
