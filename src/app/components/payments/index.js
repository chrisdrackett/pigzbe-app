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
import styles from './styles';
import WebPage from 'app/components/web-page';
import Title from 'app/components/title';
import {
    strings,
    FUNDING_URL,
    MEMO_PREPEND_TASK,
    MEMO_PREPEND_PRESENT,
    MEMO_PREPEND_ALLOWANCE,
    MEMO_PREPEND_CREATE,
} from 'app/constants';

const trimMemo = memo => {
    if (memo.indexOf(MEMO_PREPEND_ALLOWANCE) === 0) {
        return memo.slice(MEMO_PREPEND_ALLOWANCE.length).trim();
    }
    if (memo.indexOf(MEMO_PREPEND_PRESENT) === 0) {
        return memo.slice(MEMO_PREPEND_PRESENT.length).trim();
    }
    if (memo.indexOf(MEMO_PREPEND_TASK) === 0) {
        return memo.slice(MEMO_PREPEND_TASK.length).trim();
    }
    if (memo.indexOf(MEMO_PREPEND_CREATE) === 0) {
        return memo.slice(MEMO_PREPEND_CREATE.length).trim().replace(/\~/g, ' ');
    }
    return memo.trim();
};

const filters = {
    all: 'ALL',
    sent: 'SENT',
    received: 'RECEIVED',
};

export class Payments extends Component {
    state = {
        filter: 'all',
        helpOpen: false,
    }

    componentDidMount() {
        if (this.props.navigation) {
            this.focusListener = this.props.navigation.addListener('willFocus', this.update);
        }
        this.update();
    }

    componentWillUnMount() {
        if (this.focusListener) {
            this.focusListener.remove();
        }
    }

    update = () => {
        if (typeof this.props.loadPayments === 'function') {
            this.props.loadPayments(this.props.address);
        }
    }

    onHelp = () => this.setState({helpOpen: true})

    onHelpClose = () => this.setState({helpOpen: false})

    findKidByGoalAdress = goalAddress => {
        let kidWithGoal = null;
        if (!this.props.kids) {
            return null;
        }

        for (const k of this.props.kids) {
            if (k.home === goalAddress) {
                kidWithGoal = k;
                break;
            }

            for (const g of k.goals) {
                if (g.address === goalAddress) {
                    kidWithGoal = k;
                    break;
                }
            }
        }

        return kidWithGoal;
    }

    render() {
        const {filter} = this.state;
        const {loading, payments = [], showHelp, spacingBottom = false} = this.props;

        console.log('payments', payments);

        if (!showHelp && loading && !payments.length) {
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

        console.log('address', address);

        let filteredPayments = payments;

        // show a specific address's transactions
        if (address) {
            filteredPayments = payments.filter(payment => (
                (filter === 'all' && (payment.from === address || payment.to === address)) ||
                (filter === 'sent' && payment.from === address) ||
                (filter === 'received' && payment.to === address)
            ));

            filteredPayments.forEach(payment => {
                payment.direction = payment.to === address ? 'in' : 'out';
                if (payment.direction === 'in') {
                    const sender = this.findKidByGoalAdress(payment.from);
                    if (sender) {
                        payment.sender = sender.name;
                    }
                }
                payment.memo = trimMemo(payment.memo);
            });
        } else {
            filteredPayments = payments.filter(payment => (
                (filter === 'all') ||
                (filter === 'sent' && payment.direction === 'out') ||
                (filter === 'received' && payment.direction === 'in')
            ));

            filteredPayments.forEach(payment => {
                payment.memo = trimMemo(payment.memo);
            });
        }

        return (
            <View style={{flex: 1}}>
                <View style={styles.buttons} pointerEvents={showHelp ? 'none' : 'auto'}>
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
                        <Title dark>Wallet inactive</Title>
                        <Text style={styles.helpText}>
                            To activate your wallet please fund it by sending at least 1.6 XLM to your <Text style={styles.helpTextHighlight}>public address</Text> (we recommend 8.5 XLM).
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
                            title="How to activate your wallet"
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
        loading: state.wallet.loading,
        payments: state.wallet.payments,
        publicKey: state.keys.publicKey,
        kids: state.kids.kids,
    }),
    (dispatch) => ({
        loadPayments: (address) => dispatch(loadPayments(address))
    })
)(Payments);
