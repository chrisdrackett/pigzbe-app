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
import Button from 'app/components/button';
import Wollo from 'app/components/wollo';
import Modal from 'app/components/modal';
import Title from 'app/components/title';
import Paragraph from 'app/components/paragraph';
import StepModule from 'app/components/step-module';
import {
    loadExchange,
    settingsFirstTime,
    fundAccount,
    loadWallet,
    setNumKidsToAdd
} from 'app/actions';
import openURL from 'app/utils/open-url';
import ReactModal from 'react-native-modal';
import FundingMessage from 'app/components/funding-message';
import IconButton from 'app/components/icon-button';
import GameMessageBubble from 'app/components/game-message-bubble';

export class Dashboard extends Component {
    state = {
        funding: false,
        showKidAddFundingMessage: this.props.showKidAddFundingMessage,
        opacity: 1,
        pressed: false,
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
        openURL(FUNDING_URL);
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

    onFund = async () => {
        this.setState({funding: true});
        // await this.props.dispatch(fundAccount('13', '5'));
        await this.props.dispatch(fundAccount('100', '500'));
        await this.props.dispatch(loadWallet());
        this.setState({funding: false});
    }

    onFade = opacity => this.setState({opacity})

    onPressIn = () => this.setState({pressed: true})

    onPressOut = () => this.setState({pressed: false})

    render () {
        const {
            exchange,
            balance,
            balanceXLM,
            minXLM,
            hasGas,
            baseCurrency,
            firstTime,
            kids,
            publicKey,
        } = this.props;

        const loading = (!exchange) || this.state.funding;

        let coins = COINS.filter(c => c !== baseCurrency && c !== 'GOLD');

        if (coins.length > 6) {
            coins = coins.filter(c => c !== 'GBP');
        }

        console.log('balance', balance);
        console.log('balanceXLM', balanceXLM);
        console.log('minXLM', minXLM);
        console.log('hasGas', hasGas);

        const inactive = !hasGas && Number(balance) === 0;

        return (
            <Fragment>
                <StepModule
                    icon="piggy"
                    headerChildren={inactive ? (
                        <View style={{marginBottom: -22, opacity: this.state.pressed ? 0.3 : 1}}>
                            <GameMessageBubble
                                content="Hi there. Your wallet needs XLM to activate it. Read more"
                                style={{maxWidth: 300, width: 300, marginTop: 0}}
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
                    onFade={this.onFade}
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
                    {this.props.network !== 'mainnet' && (
                        <View>
                            <Button
                                label={publicKey}
                                theme="light"
                                onPress={() => openURL(`https://horizon-testnet.stellar.org/accounts/${publicKey}`)}
                                style={{marginTop: 20}}
                            />
                            <Button
                                label="Fund account"
                                theme="light"
                                onPress={this.onFund}
                            />
                        </View>
                    )}
                </StepModule>
                {inactive && this.state.opacity > 0.98 && (
                    <View style={{position: 'absolute', top: 88, left: 0, width: '100%', alignItems: 'center'}}>
                        <TouchableWithoutFeedback
                            onPress={this.onFundingInfo}
                            onPressIn={this.onPressIn}
                            onPressOut={this.onPressOut}>
                            <View style={{backgroundColor: 'rgba(0, 0, 0, 0)', width: 300, height: 80}}/>
                        </TouchableWithoutFeedback>
                    </View>
                )}
                <ReactModal
                    isVisible={firstTime}
                    animationIn="slideInUp"
                    animationOut="slideOutDown"
                    style={{margin: 0}}
                    onBackButtonPress={this.onCloseFirstTime}
                >
                    <Modal>
                        <Title dark>Wallet Inactive</Title>
                        <Paragraph>To activate your wallet please fund it by sending 1.6 XLM to your *public address*</Paragraph>
                        <Paragraph style={{marginBottom: 40}}>Alternitively, If you’re an *ICO*, *Airdrop* or *VIP* participant, claim your Wollo via settings.</Paragraph>
                        <Button
                            label="Learn how to activate wallet"
                            onPress={this.onFundingInfo}
                        />
                        <Button
                            theme="outline"
                            label={'Go to settings'}
                            onPress={this.onSettings}
                        />
                        <IconButton
                            style={{position: 'absolute', top: 0, right: 0}}
                            icon="crossBlue"
                            size={20}
                            padding={16}
                            onPress={this.onCloseFirstTime}
                        />
                    </Modal>
                </ReactModal>
                <FundingMessage
                    open={this.state.showKidAddFundingMessage}
                    balanceXLM={balanceXLM}
                    onClose={this.onCloseKidAddFundingMessage}
                />
            </Fragment>
        );
    }
}

export default connect(
    state => ({
        network: state.config.network,
        isConnected: state.app.isConnected,
        exchange: state.exchange.exchange,
        balance: state.wollo.balance,
        balanceXLM: state.wollo.balanceXLM,
        minXLM: state.wollo.minXLM,
        hasGas: state.wollo.hasGas,
        baseCurrency: state.settings.baseCurrency,
        firstTime: state.settings.firstTime,
        kids: state.kids.kids,
        publicKey: state.keys.publicKey,
    })
)(Dashboard);
