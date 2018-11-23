import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {View, TouchableWithoutFeedback} from 'react-native';
import {color} from 'app/styles';
import {
    SCREEN_SETTINGS,
    SCREEN_KIDS_INTRO,
    SCREEN_KID_DASHBOARD,
    SCREEN_KIDS_ENTER_PROFILE,
    COINS,
    FUNDING_URL,
    MIN_BALANCE,
    MIN_BALANCE_XLM_ADD_KID
} from 'app/constants';
import ConvertBalance from 'app/components/convert-balance';
import BalanceGraph from 'app/components/balance-graph';
import Kids from 'app/components/kids';
import Wollo from 'app/components/wollo';

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
import styles from './styles';
import Dev from './dev';

export class Dashboard extends Component {
    state = {
        funding: false,
        showKidAddFundingMessage: this.props.showKidAddFundingMessage,
        modalOpen: this.props.firstTime,
        headerOpacity: 1,
        bubblePressed: false,
        showActivationGuide: false,
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
        if (parseFloat(this.props.balanceXLM) < MIN_BALANCE + MIN_BALANCE_XLM_ADD_KID) {
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

    onDashboard = address => {
        const kid = this.props.kids.find(k => k.address === address);
        this.props.navigation.push(SCREEN_KID_DASHBOARD, {kid});
    }

    onFunding = funding => this.setState({funding})

    onHeaderFade = headerOpacity => this.setState({headerOpacity})

    onBubblePressIn = () => this.setState({bubblePressed: true})

    onBubblePressOut = () => this.setState({bubblePressed: false})

    onActivationGuideOpen = () => this.setState({showActivationGuide: true})

    onActivationGuideClose = () => this.setState({showActivationGuide: false})

    onModalHide = () => this.setState({modalOpen: false})

    render () {
        const {
            exchange,
            balance,
            balanceXLM,
            hasGas,
            baseCurrency,
            firstTime,
            kids,
        } = this.props;

        const loading = (!exchange) || this.state.funding;

        let coins = COINS.filter(c => c !== baseCurrency && c !== 'GOLD');

        if (coins.length > 6) {
            coins = coins.filter(c => c !== 'GBP');
        }

        // console.log('balance', balance);
        // console.log('balanceXLM', balanceXLM);
        // console.log('hasGas', hasGas);

        const inactive = !hasGas && Number(balance) === 0;

        return (
            <Fragment>
                <StepModule
                    icon="piggy"
                    headerChildren={inactive ? (
                        <View style={[styles.bubbleWrapper, {opacity: this.state.bubblePressed ? 0.3 : 1}]}>
                            <GameMessageBubble
                                content="Hi there. Your wallet needs XLM to activate it. Read more"
                                style={styles.bubble}
                                tailStyle={{left: 145}}
                            />
                        </View>
                    ) : (
                        <Wollo
                            balance={balance}
                            exchange={exchange}
                            baseCurrency={baseCurrency}
                        />
                    )}
                    extraHeaderChildrenSpace={inactive ? 24 : 18}
                    backgroundColor={color.transparent}
                    onSettings={this.onSettings}
                    loading={loading}
                    loaderMessage={this.state.funding ? 'Funding account' : null}
                    customTitle="Your dashboard"
                    onFade={this.onHeaderFade}
                >
                    <View>
                        <BalanceGraph balance={balance} balanceXLM={null} exchange={exchange} baseCurrency={baseCurrency}/>
                        <Kids
                            kids={kids}
                            exchange={exchange}
                            baseCurrency={baseCurrency}
                            onAddKids={this.onAddKids}
                            onDashboard={this.onDashboard}
                        />
                        <ConvertBalance coins={coins} exchange={exchange} balance={balance} />
                    </View>
                    <Dev
                        onFunding={this.onFunding}
                    />
                </StepModule>
                {inactive && this.state.headerOpacity > 0.7 && (
                    <View style={styles.bubbleButton}>
                        <TouchableWithoutFeedback
                            onPress={this.onFundingInfo}
                            onPressIn={this.onBubblePressIn}
                            onPressOut={this.onBubblePressOut}>
                            <View style={styles.bubbleButtonHit}/>
                        </TouchableWithoutFeedback>
                    </View>
                )}
                <WelcomeModal
                    isVisible={firstTime}
                    onClose={this.onCloseFirstTime}
                    onFundingInfo={this.onFundingInfo}
                    onSettings={this.onSettings}
                    onModalHide={this.onModalHide}
                />
                <FundingMessage
                    open={this.state.showKidAddFundingMessage}
                    balanceXLM={balanceXLM}
                    onClose={this.onCloseKidAddFundingMessage}
                    onModalHide={this.onModalHide}
                />
                <WebPage
                    open={!this.state.modalOpen && this.state.showActivationGuide}
                    url={FUNDING_URL}
                    title="How to activate your wallet"
                    onClose={this.onActivationGuideClose}
                />
            </Fragment>
        );
    }
}

export default connect(
    state => ({
        isConnected: state.app.isConnected,
        exchange: state.exchange.exchange,
        balance: state.wollo.balance,
        balanceXLM: state.wollo.balanceXLM,
        hasGas: state.wollo.hasGas,
        baseCurrency: state.settings.baseCurrency,
        firstTime: state.settings.firstTime,
        kids: state.kids.kids,
    })
)(Dashboard);
