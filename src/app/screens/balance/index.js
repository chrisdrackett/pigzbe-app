import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {View} from 'react-native';
import {color} from '../../styles';
import {
    SCREEN_SETTINGS,
    COINS,
    COIN_DPS
} from '../../constants';
import ConvertBalance from '../../components/convert-balance';
import BalanceGraph from '../../components/balance-graph';
import Button from '../../components/button';
import Wollo from '../../components/wollo';
import {getExchange} from '../../actions/coins';
import {settingsFirstTime} from '../../actions';
import Modal from '../../components/modal';
import Title from '../../components/title';
import Paragraph from '../../components/paragraph';
import StepModule from '../../components/step-module';

export class Balance extends Component {

    async componentWillMount() {
        this.props.dispatch(getExchange());
    }

    onCloseModal = () => this.props.dispatch(settingsFirstTime())

    onSettings = () => {
        this.onCloseModal();
        this.props.navigation.navigate(SCREEN_SETTINGS);
    }

    render () {
        const {
            exchange,
            error,
            balance,
            baseCurrency,
            firstTime
        } = this.props;

        const isLoading = !exchange && !error;

        console.log('balance isLoading', isLoading);

        const coins = COINS.filter(c => c !== baseCurrency && c !== 'GOLD');

        return (
            <Fragment>
                <StepModule
                    scroll
                    icon="piggy"
                    headerChildren={(
                        <View style={{marginBottom: -20}}>
                            <Wollo balance={balance}/>
                        </View>
                    )}
                    backgroundColor={color.lightGrey}
                    onSettings={this.onSettings}
                    loading={isLoading}
                    error={error}
                >
                    {(!isLoading && !error) && (
                        <View>
                            <BalanceGraph balance={balance} exchange={exchange} baseCurrency={baseCurrency}/>
                            <ConvertBalance coins={coins} exchange={exchange} balance={balance} dps={COIN_DPS}/>
                        </View>
                    )}
                </StepModule>
                {firstTime && (
                    <Modal>
                        <Title dark>Howdy!</Title>
                        <Paragraph>Welcome to your Pigzbe wallet. To fully activate your wallet you need to transfer funds into it.</Paragraph>
                        <Paragraph style={{marginBottom: 40}}>If you’re an *ICO, Airdrop, Bounty* or VIP, you can do this via settings.</Paragraph>
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
            </Fragment>
        );
    }
}

export default connect(
    state => ({
        error: state.coins.error,
        exchange: state.coins.exchange,
        balance: state.wollo.balance,
        baseCurrency: state.wollo.baseCurrency,
        firstTime: state.settings.firstTime,
    })
)(Balance);
