import React, {Component, Fragment} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import {strings} from '../../constants';
import Button from '../../components/button';
import TextInput from '../../components/text-input';
import WolloInput from '../../components/wollo-input';
import Wollo from '../../components/wollo';
import Icon from '../../components/icon';
import ExchangedDisplay from '../../components/exchanged-display';
import {isValidPublicKey} from '@pigzbe/stellar-utils';
import moneyFormat from '../../utils/money-format';
import {ASSET_CODE, COIN_DPS} from '../../constants';
import BigNumber from 'bignumber.js';
import {sendWollo} from '../../actions';
import QRScanner from '../../components/qr-scanner';

const remainingBalance = (balance, amount) => new BigNumber(balance).minus(amount);

const getBalanceAfter = (balance, amount) => moneyFormat(remainingBalance(balance, amount), COIN_DPS[ASSET_CODE]);

export default class Form extends Component {
    state ={
        review: this.props.review,
        accountKey: this.props.accountKey,
        amount: this.props.amount,
        memo: this.props.memo,
        keyValid: false,
        amountValid: false,
        memoValid: true,
        keyError: null,
        amountError: null,
        memoError: null,
        error: null,
        showScanner: false,
    }

    static defaultProps = {
        review: false,
        accountKey: '',
        amount: '',
        memo: '',
    }

    updateKey = accountKey => {
        const notOwnKey = this.props.publicKey !== accountKey;
        const keyValid = isValidPublicKey(accountKey) && notOwnKey;

        this.setState({accountKey, keyValid});
    }

    updateAmount = value => this.setState({
        amount: value,
        amountValid: true,
    })

    updateMemo = memo => {
        const memoValid = !memo || memo.length < 29;

        this.setState({memo, memoValid});
    }

    submit = () => {
        const {keyValid, amountValid, memoValid} = this.state;
        const review = keyValid && amountValid && memoValid;
        const notOwnKey = this.props.publicKey !== this.state.accountKey;

        this.setState({
            review,
            keyError: keyValid && notOwnKey ? null : new Error(strings.transferErrorInvalidKey),
            amountError: amountValid ? null : new Error(strings.transferErrorInvalidAmount),
            memoError: memoValid ? null : new Error(strings.transferErrorInvalidMessage)
        });

        this.props.onReview(review);
    }

    send = () => {
        const {accountKey, amount, memo} = this.state;

        this.props.dispatch(sendWollo(accountKey, amount, memo));
    }

    edit = () => {
        this.setState({review: false});
        this.props.onReview(false);
    }

    onScanQrCode = () => this.setState({showScanner: true})

    onCancelScanQrCode = () => this.setState({showScanner: false})

    onScanResult = event => {
        console.log('onscan', event.data);

        const accountKey = event.data;
        const notOwnKey = this.props.publicKey !== this.state.accountKey;

        const keyValid = isValidPublicKey(accountKey) && notOwnKey;

        this.setState({
            showScanner: false,
            accountKey,
            keyValid,
            keyError: keyValid ? null : new Error(strings.transferErrorInvalidKey),
        });
    }

    render() {
        const {
            keyError,
            amountError,
            memoError,
            review
        } = this.state;

        if (review) {
            return (
                <View style={styles.containerForm}>
                    <Text style={styles.label}>{strings.transferSendTo}</Text>
                    <Text style={styles.value}>{this.state.accountKey}</Text>
                    <Text style={styles.label}>{strings.transferAmount}</Text>
                    <View style={styles.amount}>
                        <Wollo
                            dark
                            small
                            balance={this.state.amount}
                            style={styles.wollo}
                        />
                        <Text style={styles.wolloLabel}>Wollo</Text>
                    </View>
                    <ExchangedDisplay
                        amount={this.state.amount}
                        currency={ASSET_CODE}
                        style={styles.exchange}
                    />
                    {this.state.memo ? (
                        <Fragment>
                            <Text style={styles.label}>{strings.transferMessage}</Text>
                            <Text style={styles.value}>{this.state.memo}</Text>
                        </Fragment>
                    ) : null}
                    <Fragment>
                        <Text style={styles.label}>{strings.transferBalanceAfter}</Text>
                        <View style={styles.amount}>
                            <Wollo
                                dark
                                small
                                balance={getBalanceAfter(this.props.balance, this.state.amount)}
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
                            onPress={this.edit}
                        />
                    </View>
                    <View style={styles.buttonWrapper}>
                        {review ? (
                            <Button
                                label={'Transfer'}
                                onPress={this.send}
                            />
                        ) : (
                            <Button
                                label={strings.transferConfirmButtonLabel}
                                disabled={!(this.state.accountKey && this.state.amount)}
                                onPress={this.submit}
                            />
                        )}
                    </View>
                </View>
            );
        }

        return (
            <View style={styles.containerForm}>
                <TextInput
                    error={!!keyError}
                    value={this.state.accountKey}
                    label={strings.transferSendTo}
                    placeholder={strings.transferSendKey}
                    onChangeText={this.updateKey}
                    numberOfLines={3}
                    style={{paddingRight: 20}}
                />
                <TouchableOpacity style={styles.scanButton} onPress={this.onScanQrCode}>
                    <Icon style={styles.scanIcon} name="qrCodeScan" />
                </TouchableOpacity>
                <WolloInput
                    error={!!amountError}
                    label={strings.transferAmount}
                    onChangeAmount={this.updateAmount}
                />
                <TextInput
                    error={!!memoError}
                    value={this.state.memo}
                    label={strings.transferMessage}
                    placeholder={strings.transferMessagePlaceholder}
                    onChangeText={this.updateMemo}
                    maxLength={28}
                    numberOfLines={2}
                />
                <View style={styles.buttonWrapper}>
                    <Button
                        label={strings.transferConfirmButtonLabel}
                        disabled={!(this.state.accountKey && this.state.amount)}
                        onPress={this.submit}
                    />
                </View>
                <QRScanner
                    visible={this.state.showScanner}
                    onScan={this.onScanResult}
                    onCancel={this.onCancelScanQrCode}
                />
            </View>
        );
    }
}
