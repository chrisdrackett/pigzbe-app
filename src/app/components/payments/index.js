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
import {
    strings,
    FUNDING_URL,
    MEMO_PREPEND_TASK,
    MEMO_PREPEND_PRESENT,
    MEMO_PREPEND_ALLOWANCE,
    MEMO_PREPEND_GOAL,
    MEMO_PREPEND_CREATE,
    MEMO_PREPEND_HOME,
} from 'app/constants';

const trimMemo = memo => {
    if (memo.indexOf(MEMO_PREPEND_ALLOWANCE) === 0) {
        return memo.slice(MEMO_PREPEND_ALLOWANCE.length);
    }
    if (memo.indexOf(MEMO_PREPEND_PRESENT) === 0) {
        return memo.slice(MEMO_PREPEND_PRESENT.length);
    }
    if (memo.indexOf(MEMO_PREPEND_TASK) === 0) {
        return memo.slice(MEMO_PREPEND_TASK.length);
    }
    if (memo.indexOf(MEMO_PREPEND_GOAL) === 0) {
        return memo.slice(MEMO_PREPEND_GOAL.length);
    }
    if (memo.indexOf(MEMO_PREPEND_CREATE) === 0) {
        return memo.slice(MEMO_PREPEND_CREATE.length);
    }
    if (memo.indexOf(MEMO_PREPEND_HOME) === 0) {
        return memo.slice(MEMO_PREPEND_HOME.length);
    }
    return memo;
};

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

    findKidByGoalAdress = goalAddress => {
        let kidWithGoal = null;

        this.props.kids.forEach(k => {
            if (k.home === goalAddress) {
                kidWithGoal = k;
            }

            k.goals.forEach(g => {
                if (g.address === goalAddress) {
                    kidWithGoal = k;
                }
            });
        });

        return kidWithGoal;
    }

    render() {
        const {filter} = this.state;
        const {loading, payments, showHelp, spacingBottom = false} = this.props;

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
            if (payment.direction === 'in') {
                const sender = this.findKidByGoalAdress(payment.from);
                if (sender) {
                    payment.sender = sender.name;
                }
            }
            payment.memo = trimMemo(payment.memo);
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
        kids: state.kids.kids,
    }),
    (dispatch) => ({
        loadPayments: (address) => dispatch(loadPayments(address))
    })
)(Payments);
