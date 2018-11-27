import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {Text, View, Keyboard} from 'react-native';
import Button from '../../components/button';
import {SCREEN_KID_DASHBOARD} from '../../constants';
import StepModule from '../../components/step-module';
import WolloInput from '../../components/wollo-input';
import Paragraph from '../../components/paragraph';
import styles from './styles';
import {deleteTask, assignTask, appAddWarningAlert} from '../../actions';
import FundingMessage from '../../components/funding-message';

export class TasksAssign extends Component {
    state = {
        amount: this.props.taskToEdit ? this.props.taskToEdit.amount : 0,
        showFundingMessage: false,
    }

    onBack = () => this.props.navigation.goBack()

    onChangeAmount = amount => this.setState({amount})

    showFundingMessage = () => this.setState({showFundingMessage: true})

    onCloseFundingMessage = () => this.setState({showFundingMessage: false})

    next = async () => {
        Keyboard.dismiss();

        if (Number(this.props.balance) < this.state.amount) {
            this.showFundingMessage();
            return;
        }

        if (this.props.taskToEdit) {
            const success = await this.props.dispatch(deleteTask(this.props.kid, this.props.taskToEdit));
            if (!success) {
                this.props.dispatch(appAddWarningAlert('Failed to update task'));
                this.props.navigation.navigate(SCREEN_KID_DASHBOARD, {kid: this.props.kid});
                return;
            }
        }

        await this.props.dispatch(assignTask(this.props.kid, this.props.task, this.state.amount));
        this.props.navigation.navigate(SCREEN_KID_DASHBOARD, {kid: this.props.kid});
    }

    render() {
        const {amount} = this.state;

        const {
            loading,
            kid,
            balances,
        } = this.props;

        return (
            <Fragment>
                <StepModule
                    pad
                    loading={loading}
                    onBack={this.onBack}
                    plain
                    //customTitle={'Tasks'}
                    icon="coins"
                    keyboardAvoidPad
                    keyboardOffset={40}
                    title="Task reward"
                >
                    <View style={styles.flexStyle}>
                        <View>
                            <Paragraph style={styles.textStyle}>
                                Set <Text style={{fontWeight: 'bold'}}>{kid.name}'s</Text> reward for this task
                            </Paragraph>
                            <WolloInput
                                initialAmount={amount}
                                onChangeAmount={this.onChangeAmount}
                            />
                        </View>
                        <Button
                            style={styles.sendButton}
                            label={`Send to ${kid.name}`}
                            onPress={this.next}
                            disabled={amount === 0}
                        />
                    </View>
                </StepModule>
                <FundingMessage
                    open={this.state.showFundingMessage}
                    balances={balances}
                    onClose={this.onCloseFundingMessage}
                    fundingType={FundingMessage.ASSIGN_TASK}
                    requiredBalance={amount}
                />
            </Fragment>
        );
    }
}

export default connect(
    (state, props) => ({
        loading: state.kids.taskLoading,
        kid: props.navigation.state.params.kid,
        task: props.navigation.state.params.task,
        taskToEdit: props.navigation.state.params.taskToEdit,
        balances: state.wallet.balances,
    })
)(TasksAssign);
