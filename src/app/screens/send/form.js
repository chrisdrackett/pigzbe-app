import React, {Component} from 'react';
import {View, TouchableOpacity} from 'react-native';
import styles from './styles';
import {strings} from 'app/constants';
import Button from 'app/components/button';
import TextInput from 'app/components/text-input';
import WolloInput from 'app/components/wollo-input';
import Icon from 'app/components/icon';
import {isValidPublicKey} from '@pigzbe/stellar-utils';
import {MEMO_MAX_LEN} from 'app/constants';
import BigNumber from 'bignumber.js';
import {appError} from 'app/actions';
import QRScanner from 'app/components/qr-scanner';

export default class Form extends Component {
    state = {
        destination: this.props.destination,
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
        destination: '',
        amount: '',
        memo: '',
    }

    updateKey = destination => {
        const notOwnKey = this.props.publicKey !== destination;
        const keyValid = isValidPublicKey(destination) && notOwnKey;

        this.setState({destination, keyValid});
    }

    updateAmount = value => this.setState({
        amount: value,
        amountValid: new BigNumber(value).isLessThanOrEqualTo(this.props.balance),
    })

    updateMemo = memo => {
        const memoValid = !memo || memo.length <= MEMO_MAX_LEN;

        this.setState({memo, memoValid});
    }

    onReview = () => {
        const {keyValid, amountValid, memoValid} = this.state;
        const notOwnKey = this.props.publicKey !== this.state.destination;

        const keyError = keyValid && notOwnKey ? null : strings.transferErrorInvalidKey;
        const amountError = amountValid ? null : strings.transferErrorInvalidAmount;
        const memoError = memoValid ? null : strings.transferErrorInvalidMessage;

        if (keyError) {
            this.props.dispatch(appError(keyError));
        } else if (amountError) {
            this.props.dispatch(appError(amountError));
        } else if (memoError) {
            this.props.dispatch(appError(memoError));
        }

        this.setState({
            keyError,
            amountError,
            memoError
        });

        const isValid = keyValid && amountValid && memoValid;

        if (isValid) {
            const {destination, amount, memo} = this.state;
            this.props.onReview({destination, amount, memo});
        }
    }

    onScanQrCode = () => this.setState({showScanner: true})

    onCancelScanQrCode = () => this.setState({showScanner: false})

    onScanResult = event => {
        console.log('onscan', event.data);

        const destination = event.data;
        const notOwnKey = this.props.publicKey !== this.state.destination;

        const keyValid = isValidPublicKey(destination) && notOwnKey;

        this.setState({
            showScanner: false,
            destination,
            keyValid,
            keyError: keyValid ? null : new Error(strings.transferErrorInvalidKey),
        });
    }

    render() {
        const {
            keyError,
            amountError,
            memoError
        } = this.state;

        return (
            <View style={styles.containerForm}>
                <TextInput
                    error={keyError}
                    value={this.state.destination}
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
                    initialAmount={this.state.amount}
                    error={amountError}
                    label={strings.transferAmount}
                    onChangeAmount={this.updateAmount}
                />
                <TextInput
                    error={memoError}
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
                        disabled={!(this.state.destination && this.state.amount)}
                        onPress={this.onReview}
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
