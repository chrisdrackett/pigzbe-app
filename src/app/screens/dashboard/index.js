import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {View} from 'react-native';
import {color} from '../../styles';
import {
    SCREEN_SETTINGS,
    SCREEN_KIDS_INTRO,
    SCREEN_KID_DASHBOARD,
    SCREEN_KIDS_ENTER_PROFILE,
    COINS,
    COIN_DPS,
    FUNDING_URL,
    MIN_BALANCE,
    MIN_BALANCE_XLM_ADD_KID
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
import {
    // loadExchange,
    settingsFirstTime,
    fundAccount,
    loadWallet,
    setNumKidsToAdd
} from '../../actions';
import openURL from '../../utils/open-url';
import ReactModal from 'react-native-modal';
import FundingMessage from '../../components/funding-message';
import IconButton from 'app/components/icon-button';
import {kidsWithBalances} from 'app/selectors';

export class Dashboard extends Component {
    state = {
        funding: false,
        showKidAddFundingMessage: this.props.showKidAddFundingMessage,
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

    // update = () => this.props.dispatch(loadExchange())
    update = () => this.props.dispatch(loadWallet())

    onCloseFirstTime = () => this.props.dispatch(settingsFirstTime())

    onSettings = () => {
        this.onCloseKidAddFundingMessage();
        this.onCloseFirstTime();
        this.props.navigation.navigate(SCREEN_SETTINGS);
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
            this.props.navigation.navigate(SCREEN_KIDS_ENTER_PROFILE);
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

    render () {
        const {
            exchange,
            error,
            balance,
            balanceXLM,
            baseCurrency,
            firstTime,
            kids,
            publicKey
        } = this.props;

        const loading = (!exchange && !error) || this.state.funding;

        const coins = COINS.filter(c => c !== baseCurrency && c !== 'GOLD');

        console.log('balance', balance);
        console.log('balanceXLM', balanceXLM);

        return (
            <Fragment>
                <StepModule
                    scroll
                    icon="piggy"
                    headerChildren={(
                        <Wollo
                            balance={balance}
                            exchange={exchange}
                            baseCurrency={baseCurrency}
                        />
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
                            {__DEV__ && (
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
                            <Kids
                                kids={kids}
                                exchange={exchange}
                                baseCurrency={baseCurrency}
                                onAddKids={this.onAddKids}
                                onDashboard={this.onDashboard}
                            />
                            <ConvertBalance coins={coins} exchange={exchange} balance={balance} dps={COIN_DPS}/>
                        </View>
                    )}
                </StepModule>

                <ReactModal
                    isVisible={firstTime}
                    animationIn="slideInUp"
                    animationOut="slideOutDown"
                    style={{margin: 0}}
                    onBackButtonPress={this.onCloseFirstTime}
                >
                    <Modal>
                        <Title dark>Howdy!</Title>
                        <Paragraph>Welcome to your Pigzbe wallet. To fully activate your wallet you need to transfer funds into it.</Paragraph>
                        <Paragraph style={{marginBottom: 40}}>If you’re an *ICO*, *Airdrop*, *Bounty* or *VIP* you can do this via settings.</Paragraph>
                        <Button
                            label={'Learn how to transfer funds'}
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
        error: state.coins.error,
        exchange: state.coins.exchange,
        balance: state.wollo.balance,
        balanceXLM: state.wollo.balanceXLM,
        baseCurrency: state.settings.baseCurrency,
        firstTime: state.settings.firstTime,
        kids: kidsWithBalances(state),
        sendError: state.wollo.error,
        sending: state.wollo.sending,
        sendStatus: state.wollo.sendStatus,
        sendComplete: state.wollo.sendComplete,
        publicKey: state.keys.publicKey,
    })
)(Dashboard);
