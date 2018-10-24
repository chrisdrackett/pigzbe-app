import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import Payment from './payment';
import ScrollList from 'app/components/scroll-list';
import Paragraph from 'app/components/paragraph';
import Loader from 'app/components/loader';
import Toggle from 'app/components/toggle';
import Button from 'app/components/button';
import {loadPayments} from 'app/actions';
import {strings, FUNDING_URL} from 'app/constants';
import styles from './styles';
import WebPage from 'app/components/web-page';

export class Payments extends Component {
    state = {
        filter: 'all',
        helpOpen: false,
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

    onHelp = () => this.setState({helpOpen: true})

    onHelpClose = () => this.setState({helpOpen: false})

    render() {
        const {filter} = this.state;
        const {loading, payments, showHelp, spacingBottom=false} = this.props;

        const filters = {
            all: 'ALL',
            sent: 'SENT',
            received: 'RECEIVED',
        };

        if (!showHelp && loading) {
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
            <View style={{flex: 1}}>
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
                {!!filteredPayments.length && !showHelp && (
                    <View style={{flex: 1}}>
                        <ScrollList
                            items={filteredPayments}
                            ItemComponent={Payment}
                            ListFooterComponent={spacingBottom ? <View style={{height: 100}}/> : null}
                        />
                    </View>
                )}
                {!filteredPayments.length && !showHelp && (
                    <Paragraph style={styles.noHistory}>
                        No transaction history
                    </Paragraph>
                )}
                {showHelp && (
                    <View style={styles.help}>
                        <Text style={styles.helpText}>
                            Learn how to buy and fund your account with Wollo
                        </Text>
                        <Button
                            label="Learn more"
                            theme="outline"
                            onPress={this.onHelp}
                            style={styles.helpButton}
                        />
                        <WebPage
                            open={this.state.helpOpen}
                            url={FUNDING_URL}
                            title="How to fund your account"
                            onClose={this.onHelpClose}
                        />
                    </View>
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
