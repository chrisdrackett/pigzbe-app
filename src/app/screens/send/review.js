import React, {Component, Fragment} from 'react';
import {View, Text} from 'react-native';
import styles from './styles';
import {strings} from 'app/constants';
import Button from 'app/components/button';
import Wollo from 'app/components/wollo';
import ExchangedDisplay from 'app/components/exchanged-display';
import moneyFormat from 'app/utils/money-format';
import {ASSET_CODE, CURRENCIES} from 'app/constants';
import BigNumber from 'bignumber.js';
import {authConfirm, authConfirmPasscode} from 'app/actions';
import ReactModal from 'react-native-modal';
import {PasscodeLogin} from '../passcode-login';
import Alert from 'app/components/alert';

const remainingBalance = (balance, amount) => new BigNumber(balance).minus(amount);

const getBalanceAfter = (balance, amount) => moneyFormat(remainingBalance(balance, amount), CURRENCIES[ASSET_CODE].dps);

export default class Review extends Component {
    state = {
        showPasscodeModal: false,
        passcodeComplete: false,
        passcodeValid: true,
        passcodeAlertMessage: null,
    }

    static defaultProps = {
        destination: '',
        amount: '',
        memo: '',
    }

    onShowPasscodeModal = () => this.setState({showPasscodeModal: true})

    onHidePasscodeModal = () => this.setState({showPasscodeModal: false})

    onCodeEntered = async code => {
        const passcodeValid = await this.props.dispatch(authConfirmPasscode(code));

        this.setState({
            passcodeValid,
            showPasscodeModal: !passcodeValid,
            passcodeComplete: true,
            passcodeAlertMessage: passcodeValid ? null : 'Invalid passcode',
        });
    }

    onPasscodeModalHide = () => {
        if (this.state.passcodeValid) {
            this.setState({
                passcodeValid: false,
                passcodeComplete: false,
                passcodeAlertMessage: null,
            });
            this.onSend();
        }
    }

    onDismissAlert = () => this.setState({passcodeAlertMessage: null})

    onPasscodeInput = () => this.setState({passcodeComplete: false})

    onTransfer = async () => {
        // check touch/passcode
        const result = await this.props.dispatch(authConfirm());

        console.log('result', result);

        if (result === 'cancel') {
            return;
        }

        if (result === 'fallback') {
            this.onShowPasscodeModal();
            return;
        }

        this.onSend();
    }

    onSend = () => this.props.onSend()

    onEdit = () => this.props.onEdit()

    render() {

        const {balance, destination, amount, memo} = this.props;

        return (
            <View style={styles.containerForm}>
                <Text style={styles.label}>{strings.transferSendTo}</Text>
                <Text style={styles.value}>{destination}</Text>
                <Text style={styles.label}>{strings.transferAmount}</Text>
                <View style={styles.amount}>
                    <Wollo
                        dark
                        small
                        balance={amount}
                        style={styles.wollo}
                    />
                    <Text style={styles.wolloLabel}>Wollo</Text>
                </View>
                <ExchangedDisplay
                    amount={amount}
                    currency={ASSET_CODE}
                    style={styles.exchange}
                />
                {memo ? (
                    <Fragment>
                        <Text style={styles.label}>{strings.transferMessage}</Text>
                        <Text style={styles.value}>{memo}</Text>
                    </Fragment>
                ) : null}
                <Fragment>
                    <Text style={styles.label}>{strings.transferBalanceAfter}</Text>
                    <View style={styles.amount}>
                        <Wollo
                            dark
                            small
                            balance={getBalanceAfter(balance, amount)}
                            style={styles.wollo}
                        />
                        <Text style={styles.wolloLabel}>Wollo</Text>
                    </View>
                </Fragment>
                <View style={styles.edit}>
                    <Button
                        theme="plain"
                        style={styles.editBtn}
                        textStyle={styles.editText}
                        label={strings.transferEditButtonLabel}
                        onPress={this.onEdit}
                    />
                </View>
                <View style={styles.buttonWrapper}>
                    <Button
                        label={'Transfer'}
                        onPress={this.onTransfer}
                    />
                </View>
                <ReactModal
                    isVisible={this.state.showPasscodeModal}
                    animationIn="slideInRight"
                    animationOut="slideOutRight"
                    style={{margin: 0}}
                    onBackButtonPress={this.onHidePasscodeModal}
                    onModalHide={this.onPasscodeModalHide}
                >
                    <Fragment>
                        <Alert
                            type="error"
                            message={this.state.passcodeAlertMessage}
                            onDismiss={this.onDismissAlert}
                        />
                        <PasscodeLogin
                            error={this.state.passcodeComplete && !this.state.passcodeValid}
                            title="Enter your passcode"
                            content="Please enter your 6-digit passcode to verify transfer"
                            onBack={this.onHidePasscodeModal}
                            onCodeEntered={this.onCodeEntered}
                            onInput={this.onPasscodeInput}
                        />
                    </Fragment>
                </ReactModal>
            </View>
        );
    }
}
