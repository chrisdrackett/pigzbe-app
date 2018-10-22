import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {color} from '../../styles';
import {
    SCREEN_TASKS_LIST,
    SCREEN_ALLOWANCE_AMOUNT,
    SCREEN_KID_TRANSACTIONS,
    SCREEN_KID_GOAL_ADD,
    SCREEN_SETTINGS,
    MIN_BALANCE,
    MIN_BALANCE_XLM_ADD_GOAL,
} from '../../constants';
import BalanceGraph from '../../components/balance-graph';
import Wollo from '../../components/wollo';
import StepModule from '../../components/step-module';
import KidAvatar from '../../components/kid-avatar';
import ActionPanel from '../../components/action-panel';
import ActionSheet from '../../components/action-sheet';
import WolloSendSlider from 'app/components/wollo-send-slider';
import styles from './styles';
import {deleteAllowance, deleteTask, deleteGoal} from '../../actions';
import FundingMessage from '../../components/funding-message';
import {kidsWithBalances} from 'app/selectors';

const Item = ({first, title, subtitle, amount, onPress}) => (
    <TouchableOpacity onPress={onPress}>
        <View style={[styles.item, first ? null : styles.itemBorder]}>
            <Text style={styles.itemTitle}>{title}
                {
                    subtitle && <Text style={styles.itemSubTitle}> ({subtitle})</Text>
                }
            </Text>
            <View style={styles.itemAmount}>
                <Wollo dark balance={amount} style={styles.itemWollo} />
                <Image source={require('./images/iconOverflow.png')} />
            </View>
        </View>
    </TouchableOpacity>
);

export class KidDashboard extends Component {
    state = {
        tasksPanelOpen: false,
        allowancePanelOpen: false,
        taskToEdit: null,
        allowanceToEdit: null,
        goalPanelOpen: false,
        goalToEdit: null,
        showFundingMessage: this.props.showFundingMessage,
        fundingType: null,
    }

    static defaultProps = {
        showFundingMessage: false,
    }

    onBack = () => this.props.navigation.goBack()

    addItem = screen => {
        const balanceXLM = parseFloat(this.props.balanceXLM);
        const balanceWLO = parseFloat(this.props.balance);

        if (screen === SCREEN_KID_GOAL_ADD && balanceXLM < MIN_BALANCE + MIN_BALANCE_XLM_ADD_GOAL) {
            this.showFundingMessage(FundingMessage.ADD_GOAL);
            return;
        }

        if (screen === SCREEN_TASKS_LIST && (balanceWLO === 0 || balanceXLM === 0)) {
            this.showFundingMessage(FundingMessage.ADD_TASK);
            return;
        }

        this.props.navigation.push(screen, {kid: this.props.kid});
    }

    onAddTask = () => this.addItem(SCREEN_TASKS_LIST)

    onAddGoal = () => this.addItem(SCREEN_KID_GOAL_ADD)

    onAddAllowance = () => this.addItem(SCREEN_ALLOWANCE_AMOUNT)

    onTaskAlertOptionSelected = async (option) => {
        console.log('++ onTaskAlertOptionSelected option', option);
        switch (option.selectedOption) {
            case 0:
                // todo navigate to task screen with active tasks
                this.props.navigation.push(SCREEN_TASKS_LIST, {kid: this.props.kid, taskToEdit: this.state.taskToEdit});
                break;
            case 1:
                await this.props.dispatch(deleteTask(this.props.kid, this.state.taskToEdit));
                break;
            default:
                // do nothing
        }

        this.setState({
            tasksPanelOpen: false,
        });
    }

    onAllowanceAlertOptionSelected = async (option) => {
        console.log('+++ onAllowanceAlertOptionSelected option', option, this.props.kid, this.state.allowanceToEdit);
        switch (option.selectedOption) {
            case 0:
                // todo navigate to task screen with active tasks
                this.props.navigation.push(SCREEN_ALLOWANCE_AMOUNT, {kid: this.props.kid, allowanceToEdit: this.state.allowanceToEdit});
                break;
            case 1:
                await this.props.dispatch(deleteAllowance(this.props.kid, this.state.allowanceToEdit));
                break;
            default:
                // do nothing
        }

        this.setState({
            allowancePanelOpen: false,
        });
    }

    onGoalAlertOptionSelected = async (option) => {
        this.setState({
            goalPanelOpen: false,
        });

        switch (option.selectedOption) {
            case 0:
                this.props.navigation.push(SCREEN_KID_GOAL_ADD, {kid: this.props.kid, goal: this.state.goalToEdit});
                break;
            case 1:
                await this.props.dispatch(deleteGoal(this.props.kid, this.state.goalToEdit));
                break;
            default:
                // do nothing
        }
    }

    onDisplayAllowanceModal = allowance => this.setState({
        allowancePanelOpen: true,
        allowanceToEdit: allowance,
    })

    onDisplayTasksModal = task => this.setState({
        tasksPanelOpen: true,
        taskToEdit: task,
    })

    onDisplayGoalModal = goal => this.setState({
        goalPanelOpen: true,
        goalToEdit: goal,
    })

    onTransactions = () => this.props.navigation.push(SCREEN_KID_TRANSACTIONS, {kid: this.props.kid});

    showFundingMessage = fundingType => this.setState({showFundingMessage: true, fundingType})

    onCloseFundingMessage = () => this.setState({showFundingMessage: false, fundingType: null})

    onSettings = () => {
        this.onCloseFundingMessage();
        this.props.navigation.push(SCREEN_SETTINGS);
    }

    render () {
        const {
            kid,
            exchange,
            error,
            baseCurrency,
            goalLoading,
            taskLoading,
            allowanceLoading,
            balanceXLM,
            balance,
        } = this.props;

        const loading = (!exchange && !error) || goalLoading || taskLoading || allowanceLoading;

        console.log('showFundingMessage', this.state.showFundingMessage);

        return (
            <Fragment>
                <StepModule
                    scroll
                    backgroundColor={loading ? color.white : color.transparent}
                    loading={loading}
                    error={error}
                    onBack={this.onBack}
                    hideLogo
                >
                    <View style={styles.header}>
                        <KidAvatar photo={kid.photo} size={54}/>
                        <Text style={styles.name}>{kid.name}</Text>
                        <TouchableOpacity onPress={this.onTransactions}>
                            <Wollo
                                balance={kid.balance}
                                exchange={exchange}
                                baseCurrency={baseCurrency}
                                link
                            />
                        </TouchableOpacity>
                    </View>
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
                                {kid.allowances && kid.allowances.length && (
                                    <View style={styles.box}>
                                        {kid.allowances.map((allowance, i) => (
                                            <Item
                                                key={i}
                                                first={i === 0}
                                                title={allowance.interval}
                                                subtitle={allowance.day}
                                                amount={allowance.amount}
                                                onPress={() => {
                                                    this.onDisplayAllowanceModal(allowance);
                                                }}
                                            />
                                        ))}
                                    </View>
                                )}
                            </ActionPanel>
                            <ActionPanel
                                title="Tasks"
                                label="Add a new task"
                                onAdd={this.onAddTask}
                                style={styles.panel}
                                boxButton
                            >
                                {kid.tasks.length &&
                                    <View style={styles.box}>
                                        {kid.tasks.map((task, i) => (
                                            <Item
                                                key={i}
                                                first={i === 0}
                                                title={task.task}
                                                amount={task.reward}
                                                onPress={() => {
                                                    this.onDisplayTasksModal(task);
                                                }}
                                            />
                                        ))}
                                    </View>
                                }
                            </ActionPanel>
                            <ActionPanel
                                title="Goals"
                                label="Add a new goal"
                                onAdd={this.onAddGoal}
                                style={styles.panel}
                                boxButton
                            >
                                {(kid.goals && kid.goals.length) &&
                                    <View style={styles.box}>
                                        {kid.goals.map((goal, i) => (
                                            <Item
                                                key={i}
                                                first={i === 0}
                                                title={goal.name}
                                                amount={goal.reward}
                                                onPress={() => {
                                                    this.onDisplayGoalModal(goal);
                                                }}
                                            />
                                        ))}
                                    </View>
                                }
                            </ActionPanel>

                            <ActionPanel
                                title="Gift"
                                style={styles.panel}
                                containerOnly={true}
                            >
                                <View style={styles.box}>
                                    <WolloSendSlider
                                        name={kid.name}
                                        address={kid.address}
                                    />
                                </View>
                            </ActionPanel>
                        </View>
                    )}
                </StepModule>
                <ActionSheet
                    open={this.state.tasksPanelOpen}
                    options={['Edit', 'Delete']}
                    title="All changes will also update child wallet"
                    onRequestClose={() => this.setState({tasksPanelOpen: false})}
                    onSelect={index => this.onTaskAlertOptionSelected({selectedOption: index})}
                />
                <ActionSheet
                    open={this.state.allowancePanelOpen}
                    options={['Edit', 'Delete']}
                    title="All changes will also update child wallet"
                    onRequestClose={() => this.setState({allowancePanelOpen: false})}
                    onSelect={index => this.onAllowanceAlertOptionSelected({selectedOption: index})}
                />
                <ActionSheet
                    open={this.state.goalPanelOpen}
                    options={['Edit', 'Delete']}
                    title="All changes will also update child wallet"
                    onRequestClose={() => this.setState({goalPanelOpen: false})}
                    onSelect={index => this.onGoalAlertOptionSelected({selectedOption: index})}
                />
                <FundingMessage
                    open={this.state.showFundingMessage}
                    balance={balance}
                    balanceXLM={balanceXLM}
                    onClose={this.onCloseFundingMessage}
                    fundingType={this.state.fundingType}
                />
            </Fragment>
        );
    }
}

export default connect(
    (state, props) => ({
        kid: kidsWithBalances(state).find(k => k.address === props.navigation.state.params.kid.address),
        error: state.exchange.error,
        exchange: state.exchange.exchange,
        balance: state.wollo.balance,
        balanceXLM: state.wollo.balanceXLM,
        baseCurrency: state.settings.baseCurrency,
        sendError: state.wollo.error,
        sending: state.wollo.sending,
        sendStatus: state.wollo.sendStatus,
        sendComplete: state.wollo.sendComplete,
        goalLoading: state.kids.goalLoading,
        taskLoading: state.kids.taskLoading,
        allowanceLoading: state.kids.allowanceLoading,
    })
)(KidDashboard);
