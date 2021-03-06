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
    SCREEN_DASHBOARD
} from '../../constants';
import BalanceGraph from 'app/components/balance-graph';
import Balance from 'app/components/balance';
import StepModule from 'app/components/step-module';
import KidAvatar from 'app/components/kid-avatar';
import ActionPanel from 'app/components/action-panel';
import ActionSheet from 'app/components/action-sheet';
import WolloSendSlider from 'app/components/wollo-send-slider';
import styles from './styles';
import FundingMessage from 'app/components/funding-message';
import ConfirmModal from 'app/components/confirm-modal';
import {
    deleteAllowance,
    deleteTask,
    deleteGoal,
    appAddWarningAlert,
    appError,
    appAddSuccessAlert,
    deleteKid
} from 'app/actions';

class Item extends Component {
    onPress = () => this.props.onPress(this.props.data)
    render() {
        const {first, title, subtitle, amount} = this.props;

        return (
            <TouchableOpacity onPress={this.onPress}>
                <View style={[styles.item, first ? null : styles.itemBorder]}>
                    <Text style={styles.itemTitle}>{title}
                        {
                            subtitle && <Text style={styles.itemSubTitle}> ({subtitle})</Text>
                        }
                    </Text>
                    <View style={styles.itemAmount}>
                        <Balance dark balance={amount} style={styles.itemWollo} />
                        <Image source={require('./images/iconOverflow.png')} />
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

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
        requestDelete: false,
        deletingKid: false,
    }

    static defaultProps = {
        showFundingMessage: false,
    }

    onBack = () => this.props.navigation.goBack()

    addItem = screen => {
        const lowBalance = Number(this.props.balances.WLO) === 0;
        if (screen === SCREEN_TASKS_LIST && (lowBalance || !this.props.hasGas)) {
            this.showFundingMessage(FundingMessage.ADD_TASK);
            return;
        }

        this.props.navigation.push(screen, {kid: this.props.kid});
    }

    onAddTask = () => this.addItem(SCREEN_TASKS_LIST)

    onAddGoal = () => this.addItem(SCREEN_KID_GOAL_ADD)

    onAddAllowance = () => this.addItem(SCREEN_ALLOWANCE_AMOUNT)

    onTaskAlertOptionSelected = async selectedOption => {
        console.log('++ onTaskAlertOptionSelected option', selectedOption);
        if (this.state.taskToEdit.partialClaim) {
            this.props.dispatch(appAddWarningAlert('Task has been partially claimed'));
            this.onCloseTasksPanel();
            return;
        }
        this.onCloseTasksPanel();
        switch (selectedOption) {
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
    }

    onCloseTasksPanel = () => this.setState({tasksPanelOpen: false})

    onAllowanceAlertOptionSelected = async selectedOption => {
        console.log('+++ onAllowanceAlertOptionSelected option', selectedOption, this.props.kid, this.state.allowanceToEdit);
        switch (selectedOption) {
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

        this.onCloseAllowancePanel();
    }

    onCloseAllowancePanel = () => this.setState({allowancePanelOpen: false})

    onGoalAlertOptionSelected = async selectedOption => {
        this.onCloseGoalPanel();

        switch (selectedOption) {
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

    onCloseGoalPanel = () => this.setState({goalPanelOpen: false})

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

    onDelete = () => this.setState({requestDelete: true})

    onDeleteCancel = () => this.setState({requestDelete: false})

    onDeleteConfirm = async () => {
        this.setState({requestDelete: false, deletingKid: true});

        const result = await this.props.dispatch(deleteKid(this.props.kid));

        console.log('result', result);

        this.setState({deletingKid: false});

        if (result.success) {
            this.props.dispatch(appAddSuccessAlert('Child profile deleted'));
            this.props.navigation.navigate(SCREEN_DASHBOARD);
        } else {
            this.props.dispatch(appError(result.error));
        }
    }

    render () {
        const {
            kid,
            exchange,
            baseCurrency,
            goalLoading,
            taskLoading,
            allowanceLoading,
            balances,
        } = this.props;

        if (!kid) {
            return null;
        }

        const loading = !exchange || goalLoading || taskLoading || allowanceLoading || this.state.deletingKid;
        const loaderMessage = taskLoading ? 'Deleting task' : this.state.deletingKid ? 'Deleting child profile' : null;

        return (
            <Fragment>
                <StepModule
                    scroll
                    backgroundColor={loading ? color.white : color.transparent}
                    loading={loading}
                    loaderMessage={loaderMessage}
                    onBack={this.onBack}
                    customTitle={kid.name}
                    hideCustomTitleUntilScrolled={true}
                    rightIcon="trash"
                    onRightIcon={this.onDelete}
                >
                    <View style={styles.header}>
                        <KidAvatar photo={kid.photo} size={54}/>
                        <Text style={styles.name}>{kid.name}</Text>
                        <TouchableOpacity onPress={this.onTransactions}>
                            <Balance
                                balance={kid.balance}
                                exchange={exchange}
                                baseCurrency={baseCurrency}
                                link
                            />
                        </TouchableOpacity>
                    </View>
                    {!loading && (
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
                                                data={allowance}
                                                onPress={this.onDisplayAllowanceModal}
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
                                                title={task.name}
                                                amount={task.amount}
                                                data={task}
                                                onPress={this.onDisplayTasksModal}
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
                                {(kid.goals && kid.goals.length > 1) &&
                                    <View style={styles.box}>
                                        {kid.goals.slice(1).map((goal, i) => (
                                            <Item
                                                key={i}
                                                first={i === 0}
                                                title={goal.name}
                                                amount={goal.reward}
                                                data={goal}
                                                onPress={this.onDisplayGoalModal}
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
                                <View style={[styles.box, styles.pad]}>
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
                    onRequestClose={this.onCloseTasksPanel}
                    onSelect={this.onTaskAlertOptionSelected}
                />
                <ActionSheet
                    open={this.state.allowancePanelOpen}
                    options={['Edit', 'Delete']}
                    title="All changes will also update child wallet"
                    onRequestClose={this.onCloseAllowancePanel}
                    onSelect={this.onAllowanceAlertOptionSelected}
                />
                <ActionSheet
                    open={this.state.goalPanelOpen}
                    options={['Edit', 'Delete']}
                    title="All changes will also update child wallet"
                    onRequestClose={this.onCloseGoalPanel}
                    onSelect={this.onGoalAlertOptionSelected}
                />
                <FundingMessage
                    open={this.state.showFundingMessage}
                    balances={balances}
                    onClose={this.onCloseFundingMessage}
                    fundingType={this.state.fundingType}
                />
                <ConfirmModal
                    type="warning"
                    title="Warning!"
                    text={[
                        'By proceeding your childs account will be closed and all their Wollo will be deposited back into your account.',
                        'This process cannot be undone and all details will be lost!'
                    ]}
                    cancel="Cancel"
                    confirm="Delete"
                    open={this.state.requestDelete}
                    onConfirm={this.onDeleteConfirm}
                    onCancel={this.onDeleteCancel}
                />
            </Fragment>
        );
    }
}

export default connect(
    (state, props) => ({
        kid: state.kids.kids.find(k => k.address === props.navigation.state.params.kid.address),
        exchange: state.exchange.exchange,
        balances: state.wallet.balances,
        hasGas: state.wallet.hasGas,
        baseCurrency: state.settings.baseCurrency,
        goalLoading: state.kids.goalLoading,
        taskLoading: state.kids.taskLoading,
        allowanceLoading: state.kids.allowanceLoading,
    })
)(KidDashboard);
