import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {color} from '../../styles';
import {SCREEN_BALANCE, SCREEN_TASKS_LIST, SCREEN_ALLOWANCE_AMOUNT} from '../../constants';
import BalanceGraph from '../../components/balance-graph';
import Wollo from '../../components/wollo';
import StepModule from '../../components/step-module';
import KidAvatar from '../../components/kid-avatar';
import ActionPanel from '../../components/action-panel';
import styles from './styles';

const Item = ({first, title, subtitle, amount}) => (
    <View style={[styles.item, first ? null : styles.itemBorder]}>
        <Text style={styles.itemTitle}>{title}
            {
                subtitle && <Text style={styles.itemSubTitle}> ({subtitle})</Text>
            }
        </Text>
        <View style={styles.itemAmount}>
            <Wollo dark balance={amount} />
        </View>
        <Image style={styles.iconOverflow} source={require('./images/iconOverflow.png')} />
    </View>
);

export class ChildDash extends Component {

    onBack = () => this.props.navigation.navigate(SCREEN_BALANCE)

    onAddTask = () => this.props.navigation.navigate(SCREEN_TASKS_LIST, {kid: this.props.kid})

    onAddAllowance = () => this.props.navigation.navigate(SCREEN_ALLOWANCE_AMOUNT, {kid: this.props.kid, currency: 'GBP'})

    render () {
        const {
            kid,
            exchange,
            error,
            baseCurrency,
        } = this.props;

        const loading = !exchange && !error;

        return (
            <Fragment>
                <StepModule
                    scroll
                    headerChildren={(
                        <View style={styles.header}>
                            <KidAvatar photo={kid.photo} size={54}/>
                            <Text style={styles.name}>{kid.name}</Text>
                            <Wollo
                                balance={kid.balance}
                                exchange={exchange}
                                baseCurrency={baseCurrency}
                            />
                        </View>
                    )}
                    backgroundColor={color.transparent}
                    loading={loading}
                    error={error}
                    onBack={this.onBack}
                    hideLogo
                >
                    {(!loading && !error) && (
                        <View>
                            <BalanceGraph balance={kid.balance} exchange={exchange} baseCurrency={baseCurrency}/>
                            <ActionPanel
                                title="Allowance"
                                label="Add an allowance"
                                onAdd={this.onAddAllowance}
                                style={[styles.panel, styles.panelFirst]}
                                boxButton
                            >
                                {kid.allowance && (
                                    <TouchableOpacity style={styles.box} onPress={() => {
                                        this.displayEditAllowance(kid);
                                    }}>
                                        <Item
                                            first
                                            title={kid.allowance.interval}
                                            subtitle={kid.allowance.day}
                                            amount={kid.allowance.amount}
                                        />
                                    </TouchableOpacity>
                                )}
                            </ActionPanel>
                            <ActionPanel
                                title="Tasks"
                                label="Add a new task"
                                onAdd={this.onAddTask}
                                style={styles.panel}
                                boxButton
                            >
                                {kid.tasks.length && (
                                    <View style={styles.box}>
                                        {kid.tasks.map(({task, reward}, i) => (
                                            <Item
                                                key={i}
                                                first={i === 0}
                                                title={task}
                                                amount={reward}
                                            />
                                        ))}
                                    </View>
                                )}
                            </ActionPanel>
                            <ActionPanel
                                title="Goals"
                                label="Add a new goal"
                                onAdd={() => {}}
                                style={styles.panel}
                                boxButton
                            >
                                <View style={styles.box} />
                            </ActionPanel>
                        </View>
                    )}
                </StepModule>
            </Fragment>
        );
    }
}

export default connect(
    (state, props) => ({
        kid: props.navigation.state.params.kid,
        error: state.coins.error,
        exchange: state.coins.exchange,
        balance: state.wollo.balance,
        balanceXLM: state.wollo.balanceXLM,
        baseCurrency: state.wollo.baseCurrency,
        kids: state.family.kids,
        sendError: state.wollo.error,
        sending: state.wollo.sending,
        sendStatus: state.wollo.sendStatus,
        sendComplete: state.wollo.sendComplete,
    })
)(ChildDash);
