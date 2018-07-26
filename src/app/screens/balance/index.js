import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {View} from 'react-native';
// import styles from './styles';
import {color} from '../../styles';
import {
    SCREEN_SETTINGS,
    COINS,
    COIN_DPS
} from '../../constants';
import ConvertBalance from '../../components/convert-balance';
import BalanceGraph from '../../components/balance-graph';
import Loader from '../../components/loader';
import Button from '../../components/button';
import Wollo from '../../components/wollo';
import {getExchange} from '../../actions/coins';
import {settingsFirstTime} from '../../actions';
import Modal from '../../components/modal';
import Title from '../../components/title';
import Paragraph from '../../components/paragraph';
import StepModule from '../../components/step-module';

class Balance extends Component {

    async componentWillMount() {
        console.log('Balance componentWillMount');
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
            escrow,
            navigation,
            firstTime
        } = this.props;

        if (!exchange && !error) {
            return <Loader isLoading />;
        }

        console.log(JSON.stringify(this.props, null, 2));

        const coins = COINS.filter(c => c !== baseCurrency && c !== 'GOLD');

        // return (
        //     <Fragment>
        //         <BaseView showSettings navigation={navigation} scrollViewStyle={styles.container} error={error}>
        //             <Wollo balance={balance}/>
        //             <Pig style={styles.pig}/>
        //             <BalanceGraph balance={balance} exchange={exchange} baseCurrency={baseCurrency}/>
        //             <ConvertBalance coins={coins} exchange={exchange} balance={balance} dps={COIN_DPS}/>
        //         </BaseView>
        //         <Footer>
        //             {escrow ? (
        //                 <Button
        //                     outline
        //                     label={strings.escrowButtonLabel}
        //                     onPress={() => navigation.navigate(SCREEN_ESCROW)}
        //                 />
        //             ) : null}
        //         </Footer>
        //
        //     </Fragment>
        // );

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
                >
                    <View>
                        <BalanceGraph balance={balance} exchange={exchange} baseCurrency={baseCurrency}/>
                        <ConvertBalance coins={coins} exchange={exchange} balance={balance} dps={COIN_DPS}/>
                    </View>
                </StepModule>
                {firstTime && (
                    <Modal>
                        <Title dark>Howdy!</Title>
                        <Paragraph>Welcome to your Pigzbe wallet. To fully activate your wallet you need to transfer funds into it.</Paragraph>
                        <Paragraph style={{marginBottom: 40}}>If you’re an *ICO, Airdrop, Bounty* or VIP, you can do this via settings.</Paragraph>
                        <Button
                            secondary
                            label={'Good to know!'}
                            onPress={this.onCloseModal}
                        />
                        <Button
                            outline
                            label={'Go to settings'}
                            onPress={this.onSettings}
                        />
                    </Modal>
                )}
            </Fragment>
        );
    }
}

// export for test
export const BalanceComponent = Balance;

export default connect(
    state => ({
        error: state.coins.error,
        exchange: state.coins.exchange,
        balance: state.wollo.balance,
        baseCurrency: state.wollo.baseCurrency,
        escrow: state.escrow.escrowPublicKey,
        firstTime: state.settings.firstTime,
    })
)(Balance);
