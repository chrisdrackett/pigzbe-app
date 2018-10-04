import React, {Component} from 'react';
import {View, TouchableWithoutFeedback} from 'react-native';
import {connect} from 'react-redux';
import Payment from './payment';
import ScrollList from 'app/components/scroll-list';
import Paragraph from 'app/components/paragraph';
import Loader from 'app/components/loader';
import Toggle from 'app/components/toggle';
import {loadPayments} from 'app/actions';
import {strings} from 'app/constants';
import styles from './styles';

export class Payments extends Component {
    state = {
        filter: 'all',
    }
    componentDidMount() {
        if (this.props.navigation) {
            this.focusListener = this.props.navigation.addListener('didFocus', this.update);
        }
        this.update();
    }

    componentWillUnMount() {
        if (this.focusListener) {
            this.focusListener.remove();
        }
    }

    update = () => this.props.loadPayments(this.props.address)

    render() {
        const {filter} = this.state;
        const {loading, payments} = this.props;

        const filters = {
            all: 'All',
            sent: 'Sent',
            received: 'Received',
        };

        if (loading) {
            return (
                <Loader
                    loading={true}
                    message={strings.transferHistoryLoading}
                    light
                    style={{backgroundColor: 'transparent'}}
                />
            );
        }

        const address = this.props.address || this.props.publicKey;

        let filteredPayments = payments;

        // show a specific address's transactions
        filteredPayments = payments.filter(payment => (
            (filter === 'all' && (payment.from === address || payment.to === address)) ||
            (filter === 'sent' && payment.from === address) ||
            (filter === 'received' && payment.to === address)
        ));

        filteredPayments.forEach(payment => {
            payment.direction = payment.to === address ? 'in' : 'out';
        });

        return (
            <View style={{flex:1}}>
                <View style={styles.buttons}>
                    {Object.keys(filters).map(key =>
                        (<Toggle
                            key={key}
                            style={styles.toggle}
                            innerStyle={[styles.button, this.state.filter === key ? null : styles.buttonInactive]}
                            label={filters[key]}
                            onPress={() => {
                                this.setState({filter: key});
                            }}
                            active={this.state.filter === key}
                        />)
                    )}
                </View>
                {!!filteredPayments.length && (
                    <View style={{flex:1}}>
                        <ScrollList
                            items={filteredPayments}
                            ItemComponent={Payment}
                        />
                    </View>
                )}
                {!filteredPayments.length && (
                    <Paragraph style={styles.noHistory}>
                        No transaction history
                    </Paragraph>
                )}
            </View>
        );
    }
}

export default connect(
    state => ({
        loading: state.wollo.loading,
        payments: state.wollo.payments,
        publicKey: state.keys.publicKey,
    }),
    (dispatch) => ({
        loadPayments: (address) => dispatch(loadPayments(address))
    })
)(Payments);
