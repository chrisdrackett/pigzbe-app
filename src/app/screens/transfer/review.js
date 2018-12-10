import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {View, Text} from 'react-native';
import styles from './styles';
import {strings} from 'app/constants';
import Button from 'app/components/button';
import Balance from 'app/components/balance';
import ExchangedDisplay from 'app/components/exchanged-display';
import moneyFormat from 'app/utils/money-format';
import {ASSET_CODE, CURRENCIES} from 'app/constants';
import BigNumber from 'bignumber.js';
import {authConfirm, authConfirmPasscode} from 'app/actions';
import ReactModal from 'react-native-modal';
import {PasscodeLogin} from '../passcode-login';
import Alert from 'app/components/alert';
import {getBalance, getAvailableBalance} from 'app/selectors';

const remainingBalance = (balance, amount) => new BigNumber(balance).minus(amount);

const getBalanceAfter = (balance, amount, selectedToken) => {
    let remaining = remainingBalance(balance, amount);
    if (selectedToken === 'XLM') {
        remaining = remaining.minus('0.00001');
    }
    return moneyFormat(remaining, CURRENCIES[ASSET_CODE].dps);
};

const Amount = ({label, amount, selectedToken, extraDps}) => (
    <Fragment>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.amount}>
            <Balance
                dark
                small
                balance={amount}
                style={styles.wollo}
                selectedToken={selectedToken}
                extraDps={extraDps}
            />
            <Text style={styles.wolloLabel}>{CURRENCIES[selectedToken].name}</Text>
        </View>
    </Fragment>
);

export class Review extends Component {
    state = {
        showPasscodeModal: false,
        passcodeComplete: false,
        passcodeValid: false,
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

        const {balance, destination, amount, memo, selectedToken, baseCurrency, available} = this.props;

        const token = CURRENCIES[selectedToken];

        return (
            <View style={styles.containerForm}>
                <Text style={styles.label}>{`Send ${token.name} to`}</Text>
                <Text style={styles.value}>{destination}</Text>
                <Amount
                    label={strings.transferAmount}
                    amount={amount}
                    selectedToken={selectedToken}
                />
                <ExchangedDisplay
                    amount={amount}
                    currencyFrom={selectedToken}
                    currencyTo={baseCurrency}
                    style={styles.exchange}
                    extraDps={1}
                />
                {memo ? (
                    <Fragment>
                        <Text style={styles.label}>{strings.transferMessage}</Text>
                        <Text style={styles.value}>{memo}</Text>
                    </Fragment>
                ) : null}
                <Amount
                    label={strings.transferBalanceAfter}
                    amount={getBalanceAfter(balance, amount, selectedToken)}
                    selectedToken={selectedToken}
                />
                {selectedToken === 'XLM' && (
                    <ExchangedDisplay
                        label="Available balance after transfer:"
                        amount={getBalanceAfter(available, amount)}
                        currencyFrom={selectedToken}
                        currencyTo={selectedToken}
                    />
                )}
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

export default connect(state => ({
    baseCurrency: state.settings.baseCurrency,
    exchange: state.exchange.exchange,
    selectedToken: state.wallet.selectedToken,
    balance: getBalance(state),
    available: getAvailableBalance(state),
    publicKey: state.keys.publicKey,
}))(Review);
