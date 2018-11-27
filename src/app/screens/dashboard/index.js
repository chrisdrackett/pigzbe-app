import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {View, TouchableOpacity} from 'react-native';
import {color} from 'app/styles';
import {
    SCREEN_SETTINGS,
    SCREEN_KIDS_INTRO,
    SCREEN_KID_DASHBOARD,
    SCREEN_KIDS_ENTER_PROFILE,
    SCREEN_TRANSACTIONS,
    COINS,
    FUNDING_URL,
    MIN_BALANCE,
    MIN_BALANCE_XLM_ADD_KID
} from 'app/constants';
import ConvertBalance from 'app/components/convert-balance';
import BalanceGraph from 'app/components/balance-graph';
import Kids from 'app/components/kids';
import Balance from 'app/components/balance';

import StepModule from 'app/components/step-module';
import {
    loadExchange,
    settingsFirstTime,
    loadWallet,
    setNumKidsToAdd
} from 'app/actions';
import FundingMessage from 'app/components/funding-message';
import GameMessageBubble from 'app/components/game-message-bubble';
import WebPage from 'app/components/web-page';
import WelcomeModal from 'app/components/welcome-modal';
import Pig from 'app/components/pig';
import styles from './styles';
import Dev from './dev';
import ViewAddress from '../view-address';
import ReactModal from 'react-native-modal';
import {getBalance} from 'app/selectors';

export class Dashboard extends Component {
    state = {
        funding: false,
        showKidAddFundingMessage: this.props.showKidAddFundingMessage,
        modalOpen: this.props.firstTime,
        showActivationGuide: false,
        showViewAdressModal: false,
    }

    static defaultProps = {
        showKidAddFundingMessage: false,
    }

    componentDidMount() {
        this.focusListener = this.props.navigation.addListener('willFocus', this.update);
    }

    componentWillUnMount() {
        this.focusListener.remove();
    }

    componentDidUpdate(prevProps) {
        if (this.props.navigation.isFocused() && !prevProps.isConnected && this.props.isConnected) {
            this.update();
        }
    }

    update = () => {
        this.props.dispatch(loadWallet());
        this.props.dispatch(loadExchange());
    }

    onCloseFirstTime = () => this.props.dispatch(settingsFirstTime())

    onSettings = () => {
        this.onCloseKidAddFundingMessage();
        this.onCloseFirstTime();
        this.props.navigation.push(SCREEN_SETTINGS);
    }

    onFundingInfo = () => {
        this.onCloseKidAddFundingMessage();
        this.onCloseFirstTime();
        this.onActivationGuideOpen();
    }

    onAddKids = () => {
        if (parseFloat(this.props.balances.XLM) < MIN_BALANCE + MIN_BALANCE_XLM_ADD_KID) {
            this.setState({showKidAddFundingMessage: true});
            return;
        }

        if (this.props.kids.length) {
            this.props.dispatch(setNumKidsToAdd(1));
            this.props.navigation.push(SCREEN_KIDS_ENTER_PROFILE);
            return;
        }
        this.props.navigation.push(SCREEN_KIDS_INTRO);
    }

    onCloseKidAddFundingMessage = () => this.setState({showKidAddFundingMessage: false})

    onTransactions = () => this.props.navigation.push(SCREEN_TRANSACTIONS);

    onDashboard = address => {
        const kid = this.props.kids.find(k => k.address === address);
        this.props.navigation.push(SCREEN_KID_DASHBOARD, {kid});
    }

    onFunding = funding => this.setState({funding})

    onActivationGuideOpen = () => this.setState({showActivationGuide: true})

    onActivationGuideClose = () => this.setState({showActivationGuide: false})

    onModalHide = () => this.setState({modalOpen: false})

    onViewAddress = () => this.setState({showViewAdressModal: true})

    onHideAddress = () => this.setState({showViewAdressModal: false})

    render () {
        const {
            exchange,
            selectedToken,
            balance,
            balances,
            hasGas,
            baseCurrency,
            firstTime,
            kids,
        } = this.props;

        const loading = (!exchange) || this.state.funding;

        let coins = COINS.filter(c => c !== baseCurrency && c !== 'GOLD' && c !== selectedToken);

        if (coins.length > 6) {
            coins = coins.filter(c => c !== 'GBP');
        }

        console.log('selectedToken', selectedToken);
        console.log('balance', balance);
        console.log('balances', balances);
        // console.log('hasGas', hasGas);
        console.log('exchange', exchange);

        const inactive = !hasGas && Number(balances.WLO) === 0;

        return (
            <Fragment>
                <StepModule
                    backgroundColor={color.transparent}
                    onSettings={this.onSettings}
                    loading={loading}
                    loaderMessage={this.state.funding ? 'Funding account' : null}
                    customTitle="Your dashboard"
                    rightIcon="qrCode"
                    onRightIcon={this.onViewAddress}
                    tokenSelector={true}
                >
                    <View>
                        <View style={styles.header}>
                            {inactive ? (
                                <TouchableOpacity onPress={this.onFundingInfo}>
                                    <View style={styles.bubbleWrapper}>
                                        <GameMessageBubble
                                            content="Hi there. Your wallet needs XLM to activate it. Read more"
                                            style={styles.bubble}
                                            tailStyle={{left: 145}}
                                        />
                                    </View>
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity onPress={this.onTransactions}>
                                    <Wollo
                                        balance={balance}
                                        exchange={exchange}
                                        baseCurrency={baseCurrency}
                                        selectedToken={selectedToken}
                                        link
                                    />
                                </TouchableOpacity>
                            )}
                            <Pig />
                        </View>
                        <BalanceGraph
                            balance={balance}
                            exchange={exchange}
                            baseCurrency={baseCurrency}
                            selectedToken={selectedToken}
                        />
                        <Kids
                            kids={kids}
                            exchange={exchange}
                            baseCurrency={baseCurrency}
                            onAddKids={this.onAddKids}
                            onDashboard={this.onDashboard}
                        />
                        <ConvertBalance
                            coins={coins}
                            exchange={exchange}
                            balance={balance}
                            selectedToken={selectedToken}
                        />
                    </View>
                    <Dev
                        onFunding={this.onFunding}
                    />
                </StepModule>
                <WelcomeModal
                    isVisible={firstTime}
                    onClose={this.onCloseFirstTime}
                    onFundingInfo={this.onFundingInfo}
                    onSettings={this.onSettings}
                    onModalHide={this.onModalHide}
                />
                <FundingMessage
                    open={this.state.showKidAddFundingMessage}
                    balances={balances}
                    onClose={this.onCloseKidAddFundingMessage}
                    onModalHide={this.onModalHide}
                />
                <WebPage
                    open={!this.state.modalOpen && this.state.showActivationGuide}
                    url={FUNDING_URL}
                    title="How to activate your wallet"
                    onClose={this.onActivationGuideClose}
                />
                <ReactModal
                    isVisible={this.state.showViewAdressModal}
                    animationIn="slideInRight"
                    animationOut="slideOutRight"
                    style={{margin: 0}}
                    onBackButtonPress={this.onHideAddress}
                >
                    <ViewAddress
                        publicKey={this.props.publicKey}
                        onBack={this.onHideAddress}
                    />
                </ReactModal>
            </Fragment>
        );
    }
}

export default connect(
    state => ({
        isConnected: state.app.isConnected,
        exchange: state.exchange.exchange,
        selectedToken: state.wallet.selectedToken,
        hasGas: state.wallet.hasGas,
        baseCurrency: state.settings.baseCurrency,
        firstTime: state.settings.firstTime,
        kids: state.kids.kids,
        publicKey: state.keys.publicKey,
        balances: state.wallet.balances,
        balance: getBalance(state),
    })
)(Dashboard);
