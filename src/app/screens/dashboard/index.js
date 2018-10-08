import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {View} from 'react-native';
import {color} from '../../styles';
import {
    SCREEN_SETTINGS,
    SCREEN_KIDS_INTRO,
    SCREEN_KID_DASHBOARD,
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
import {
    loadExchange,
    settingsFirstTime,
    fundAccount,
    loadWallet
} from '../../actions';
import openURL from '../../utils/open-url';
import ReactModal from 'react-native-modal';
import FundingMessage from '../../components/funding-message';

export class Dashboard extends Component {
    state = {
        funding: false,
        showFundingMessage: this.props.showFundingMessage,
    }

    static defaultProps = {
        showFundingMessage: false,
    }

    componentDidMount() {
        this.focusListener = this.props.navigation.addListener('didFocus', this.update);
    }

    componentWillUnMount() {
        this.focusListener.remove();
    }

    update = () => this.props.dispatch(loadExchange())

    onCloseFirstTime = () => this.props.dispatch(settingsFirstTime())

    onCloseFundingMessage = () => this.setState({showFundingMessage: false})

    onSettings = () => {
        this.onCloseFundingMessage();
        this.onCloseFirstTime();
        this.props.navigation.navigate(SCREEN_SETTINGS);
    }

    onAddKids = () => {
        if (this.props.kids.length) {
            // TODO: skip to the profile if already been through first steps
            // this.props.navigation.navigate(SCREEN_FAMILY_PROFILE);
            // return;
        }
        this.props.navigation.push(SCREEN_KIDS_INTRO);
    }

    onDashboard = address => {
        const kid = this.props.kids.find(k => k.address === address);
        this.props.navigation.push(SCREEN_KID_DASHBOARD, {kid});
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
            publicKey
        } = this.props;

        const loading = (!exchange && !error) || this.state.funding;

        const coins = COINS.filter(c => c !== baseCurrency && c !== 'GOLD');

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
                >
                    <Modal>
                        <Title dark>Howdy!</Title>
                        <Paragraph>Welcome to your Pigzbe wallet. To fully activate your wallet you need to transfer funds into it.</Paragraph>
                        <Paragraph style={{marginBottom: 40}}>If you’re an *ICO* participant, you can do this via settings.</Paragraph>
                        <Button
                            label={'Good to know!'}
                            onPress={this.onCloseFirstTime}
                        />
                        <Button
                            theme="outline"
                            label={'Go to settings'}
                            onPress={this.onSettings}
                        />
                    </Modal>
                </ReactModal>
                <FundingMessage
                    isVisible={!firstTime && this.state.showFundingMessage}
                    onSettings={this.onSettings}
                    onClose={this.onCloseFundingMessage}
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
        kids: state.kids.kids,
        sendError: state.wollo.error,
        sending: state.wollo.sending,
        sendStatus: state.wollo.sendStatus,
        sendComplete: state.wollo.sendComplete,
        publicKey: state.keys.publicKey,
    })
)(Dashboard);
