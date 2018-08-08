import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {View, Text} from 'react-native';
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
import Modal from '../../components/modal';
import Title from '../../components/title';
import Paragraph from '../../components/paragraph';
import StepModule from '../../components/step-module';
import {loadExchange, settingsFirstTime, familyAddChild, loadFamily} from '../../actions';

export class Balance extends Component {

    componentDidMount() {
        this.focusListener = this.props.navigation.addListener('didFocus', this.update);
        this.props.dispatch(loadFamily());
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

    onAddChild = () => {
        this.props.dispatch(familyAddChild('Iggy', '27/05/2004', null));
    }

    render () {
        const {
            exchange,
            error,
            balance,
            balanceXLM,
            baseCurrency,
            firstTime,
            children
        } = this.props;

        const loading = !exchange && !error;

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
                    loading={loading}
                    error={error}
                >
                    {(!loading && !error) && (
                        <View>
                            <BalanceGraph balance={balance} balanceXLM={balanceXLM} exchange={exchange} baseCurrency={baseCurrency}/>
                            <Button label="Add Child" onPress={this.onAddChild} />
                            {children.map(child => (
                                <View>
                                    <Text>{child.name}</Text>
                                    <Text>{child.dob}</Text>
                                    <Text>{child.address}</Text>
                                </View>
                            ))}
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
        children: state.family.children,
    })
)(Balance);
