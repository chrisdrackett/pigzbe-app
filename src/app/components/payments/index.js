import React, {Component} from 'react';
import {loadPayments} from '../../actions';
import Payment from './payment';
import ScrollList from '../scroll-list';
import {strings} from '../../constants';

export default class Payments extends Component {

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
