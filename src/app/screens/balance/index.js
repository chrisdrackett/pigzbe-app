import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {View} from 'react-native';
import {color} from '../../styles';
import {
    SCREEN_SETTINGS,
    SCREEN_FAMILY_INTRO,
    SCREEN_TASKS_LIST,
    SCREEN_CHILD_DASH,
    COINS,
    COIN_DPS
} from '../../constants';
import ConvertBalance from '../../components/convert-balance';
import BalanceGraph from '../../components/balance-graph';
import Kids from '../../components/kids';
import Button from '../../components/button';
import Wollo from '../../components/wollo';
import Modal from '../../components/modal';
import Title from '../../components/title';
import Paragraph from '../../components/paragraph';
import StepModule from '../../components/step-module';
import ConfirmSend from '../../components/confirm-send';
import Progress from '../../components/progress';
import {
    loadExchange,
    settingsFirstTime,
    familyTransfer,
    loadFamilyBalances,
    fundAccount,
    loadWallet
} from '../../actions';

export class Balance extends Component {
    state = {
        sendModalClosed: false,
        confirmSend: false,
        name: '',
        address: '',
        amount: '',
        funding: false,
    }

    componentDidMount() {
        this.focusListener = this.props.navigation.addListener('didFocus', this.update);
    }

    componentWillUnMount() {
        this.focusListener.remove();
    }

    update = () => this.props.dispatch(loadExchange())

    onCloseModal = () => this.props.dispatch(settingsFirstTime())

    onSettings = () => {
        this.onCloseModal();
        this.props.navigation.navigate(SCREEN_SETTINGS);
    }

    onSend = (name, address, amount) => this.setState({
        confirmSend: true,
        name,
        address,
        amount
    })

    onConfirmSend = () => {
        this.setState({confirmSend: false, sendModalClosed: false});
        this.props.dispatch(familyTransfer(this.state.address, this.state.amount));
    }

    onCancelSend = () => this.setState({
        confirmSend: false,
        name: '',
        address: '',
        amount: ''
    })

    onCloseSendModal = () => {
        this.props.dispatch(loadFamilyBalances(this.state.address));
        this.setState({sendModalClosed: true});
    }

    onAddKids = () => {
        if (this.props.kids.length) {
            // TODO: skip to the profile if already been through first steps
            // this.props.navigation.navigate(SCREEN_FAMILY_PROFILE);
            // return;
        }
        this.props.navigation.navigate(SCREEN_FAMILY_INTRO);
    }

    onDashboard = address => {
        const kid = this.props.kids.find(k => k.address === address);
        this.props.navigation.navigate(SCREEN_CHILD_DASH, {kid});
    }

    onFund = async () => {
        this.setState({funding: true});
        await this.props.dispatch(fundAccount());
        await this.props.dispatch(loadWallet());
        this.setState({funding: false});
    }

    render () {
        const {
            exchange,
            error,
            balance,
            balanceXLM,
            baseCurrency,
            firstTime,
            kids,
            sendError,
            sending,
            sendComplete,
        } = this.props;

        const loading = (!exchange && !error) || this.state.funding;

        const coins = COINS.filter(c => c !== baseCurrency && c !== 'GOLD');

        return (
            <Fragment>
                <StepModule
                    scroll
                    icon="piggy"
                    headerChildren={(
                        <View style={{marginBottom: -20}}>
                            <Wollo
                                balance={balance}
                                exchange={exchange}
                                baseCurrency={baseCurrency}
                            />
                        </View>
                    )}
                    backgroundColor={color.transparent}
                    onSettings={this.onSettings}
                    loading={loading}
                    loaderMessage={this.state.funding ? 'Funding account' : null}
                    error={error}
                >
                    {(!loading && !error) && (
                        <View>
                            <BalanceGraph balance={balance} balanceXLM={balanceXLM} exchange={exchange} baseCurrency={baseCurrency}/>
                            {(__DEV__ && Number(balance) === 0) && (
                                <Button
                                    label="Fund account"
                                    theme="light"
                                    onPress={this.onFund}
                                    style={{marginTop: 20}}
                                />
                            )}
                            <Kids
                                kids={kids}
                                exchange={exchange}
                                baseCurrency={baseCurrency}
                                parentBalance={balance}
                                onSend={this.onSend}
                                onAddKids={this.onAddKids}
                                onDashboard={this.onDashboard}
                            />
                            <ConvertBalance coins={coins} exchange={exchange} balance={balance} dps={COIN_DPS}/>
                        </View>
                    )}
                </StepModule>
                {firstTime && (
                    <Modal>
                        <Title dark>Howdy!</Title>
                        <Paragraph>Welcome to your Pigzbe wallet. To fully activate your wallet you need to transfer funds into it.</Paragraph>
                        <Paragraph style={{marginBottom: 40}}>If you’re an *ICO* participant, you can do this via settings.</Paragraph>
                        <Button
                            label={'Good to know!'}
                            onPress={this.onCloseModal}
                        />
                        <Button
                            theme="outline"
                            label={'Go to settings'}
                            onPress={this.onSettings}
                        />
                    </Modal>
                )}
                {this.state.confirmSend && (
                    <ConfirmSend
                        name={this.state.name}
                        amount={this.state.amount}
                        onYes={this.onConfirmSend}
                        onNo={this.onCancelSend}
                    />
                )}
                {!this.state.sendModalClosed && (
                    <Progress
                        active={sending}
                        complete={sendComplete}
                        title={sendComplete ? 'Success!' : 'Transfer in progress'}
                        error={sendError}
                        text={sendComplete ?
                            `*${this.state.amount} Wollo* has successfully been sent to ${this.state.name}`
                            :
                            `Sending *${this.state.amount} Wollo* to ${this.state.name}`
                        }
                        buttonLabel="Close"
                        onPress={this.onCloseSendModal}
                    />
                )}
            </Fragment>
        );
    }
}

export default connect(
    state => ({
        error: state.coins.error,
        exchange: state.coins.exchange,
        balance: state.wollo.balance,
        balanceXLM: state.wollo.balanceXLM,
        baseCurrency: state.wollo.baseCurrency,
        firstTime: state.settings.firstTime,
        kids: state.family.kids,
        sendError: state.wollo.error,
        sending: state.wollo.sending,
        sendStatus: state.wollo.sendStatus,
        sendComplete: state.wollo.sendComplete,
    })
)(Balance);
