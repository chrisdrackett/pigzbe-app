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
import {loadPayments} from '../../actions';
import isDesktop from '../../utils/is-desktop';
import Payment from './payment';

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
            <View style={styles.containerBody}>
                <Text style={styles.title}>{'Transfer History'}</Text>
                {isDesktop ? (
                    <ScrollView>
                        {payments.map((item, i) => (
                            <Payment key={i} {...item}/>
                        ))}
                    </ScrollView>
                ) : (
                    <FlatList
                        data={payments}
                        renderItem={({item}) => <Payment {...item}/>}
                    />
                )}
                <Loader
                    message={'Loading payments'}
                    isLoading={loading}
                    light
                />
            </View>
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
