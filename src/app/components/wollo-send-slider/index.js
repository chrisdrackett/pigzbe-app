import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {connect} from 'react-redux';
import styles from './styles';
import Slider from '../slider';
import Button from '../button';
import AmountExchange from '../amount-exchange';
import ConfirmSend from 'app/components/confirm-send';
import Progress from 'app/components/progress';
import {
    sendWolloToKid,
    loadKidsBalances,
} from '../../actions';

const MAX_AMOUNT = 100;

const getAmount = (value, balance) => {
    const max = Math.min(balance, MAX_AMOUNT);
    return Math.round(value * Math.floor(Number(max)));
};

export class WolloSendSlider extends Component {
    state = {
        value: 0,
        amount: 0,
        sendModalClosed: false,
        confirmSend: false,
    }

    onSliderChange = value => this.setState({
        value,
        amount: getAmount(value, this.props.balance)
    })

    onSend = () => this.setState({
        confirmSend: true,
    })

    onConfirmSend = () => {
        this.setState({confirmSend: false, sendModalClosed: false});
        this.props.sendWolloToKid(this.state.amount);
    }

    onCancelSend = () => this.setState({
        confirmSend: false,
    })

    onCloseSendModal = () => {
        this.props.sendWolloToKid();
        this.setState({sendModalClosed: true});
    }

    render() {
        const {
            exchange,
            baseCurrency,
            sendError,
            sending,
            sendComplete,
        } = this.props;

        return (
            <View>
                <View style={styles.valueWrapper}>
                    <View style={[styles.value, {
                        left: `${this.state.value * 100}%`,
                        opacity: this.state.amount ? 1 : 0,
                    }]}>
                        <Text style={styles.valueText}>{this.state.amount}</Text>
                        <View style={styles.valuePoint}/>
                    </View>
                </View>

                <Slider value={this.state.value} onValueChange={this.onSliderChange}/>
                {this.state.value === 0 ? (
                    <Text style={styles.exchange}>Send Wollo</Text>
                ) : (
                    <AmountExchange
                        style={styles.exchange}
                        amount={this.state.amount}
                        exchange={exchange}
                        baseCurrency={baseCurrency}
                    />
                )}
                {this.state.amount !== 0 &&
                    <Button
                        label="Send Wollo"
                        onPress={this.onSend}
                    />
                }

                {this.state.confirmSend && (
                    <ConfirmSend
                        name={this.props.name}
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
                            `*${this.state.amount} Wollo* has successfully been sent to ${this.props.name}`
                            :
                            `Sending *${this.state.amount} Wollo* to ${this.props.name}`
                        }
                        buttonLabel="Close"
                        onPress={this.onCloseSendModal}
                    />
                )}
            </View>
        );
    }
}

export default connect(
    (state) => ({
        balance: state.wollo.balance,
        baseCurrency: state.settings.baseCurrency,
        exchange: state.coins.exchange,
        sendError: state.wollo.error,
        sending: state.wollo.sending,
        sendStatus: state.wollo.sendStatus,
        sendComplete: state.wollo.sendComplete,
    }),
    (dispatch, ownProps) => ({
        sendWolloToKid: amount => dispatch(sendWolloToKid(ownProps.address, amount)),
        loadKidsBalances: () => dispatch(loadKidsBalances(ownProps.address)),
    }),
)(WolloSendSlider);
