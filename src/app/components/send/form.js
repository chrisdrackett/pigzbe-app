import React, {Component, Fragment} from 'react';
import {View, Text, Image} from 'react-native';
import styles from './styles';
import {strings} from '../../constants';
import Button from '../button';
import Title from '../title';
import TextInput from '../text-input';
import {isValidPublicKey} from '@pigzbe/stellar-utils';
import moneyFormat from '../../utils/money-format';
import {ASSET_CODE, COIN_SYMBOLS, COIN_DPS} from '../../constants';
import BigNumber from 'bignumber.js';
import {sendWollo} from '../../actions';

const getExchange = (exchange, amount) => {
    const coins = ['EUR', 'USD', 'JPY', 'GBP'];
    return coins.map(coin => {
        const val = amount ? exchange[coin] * Number(amount) : 0;
        return `${COIN_SYMBOLS[coin]}${moneyFormat(val, COIN_DPS[coin])}`;
    }).join(', ');
};

const remainingBalance = (balance, amount) => new BigNumber(balance).minus(amount);

const getBalanceAfter = (balance, amount) => moneyFormat(remainingBalance(balance, amount), COIN_DPS[ASSET_CODE]);

export default class Form extends Component {
    state ={
        confirm: false,
        key: '',
        amount: '',
        memo: '',
        keyValid: false,
        amountValid: false,
        memoValid: true,
        keyError: null,
        amountError: null,
        memoError: null,
        error: null,
        estimate: getExchange()
    }

    updateKey(key) {
        const keyValid = isValidPublicKey(key);

        this.setState({key, keyValid});
    }

    updateAmount(value) {
        const {balance, exchange} = this.props;

        const amount = value.replace(/[^0-9.]/g, '');
        const amountValid = amount && Number(amount) > 0 && remainingBalance(balance, amount).isGreaterThanOrEqualTo(0);
        const estimate = getExchange(exchange, amount);

        this.setState({
            amount,
            amountValid,
            estimate
        });
    }

    updateMemo(memo) {
        const memoValid = !memo || memo.length < 29;

        this.setState({memo, memoValid});
    }

    submit() {
        const {keyValid, amountValid, memoValid} = this.state;

        this.setState({
            confirm: keyValid && amountValid && memoValid,
            keyError: keyValid ? null : new Error(strings.transferErrorInvalidKey),
            amountError: amountValid ? null : new Error(strings.transferErrorInvalidAmount),
            memoError: memoValid ? null : new Error(strings.transferErrorInvalidMessage)
        });
    }

    send() {
        const {dispatch} = this.props;
        const {key, amount, memo} = this.state;

        dispatch(sendWollo(key, amount, memo));
    }

    render() {
        const {
            estimate,
            keyError,
            amountError,
            memoError,
            confirm
        } = this.state;

        return (
            <View style={styles.containerForm}>
                <View style={styles.title}>
                    <Title>
                        {confirm ? strings.transferConfirmTitle : strings.transferSendTitle}
                    </Title>
                </View>
                <TextInput
                    dark
                    error={!!keyError}
                    value={this.state.key}
                    label={strings.transferSendTo}
                    placeholder={strings.transferSendKey}
                    onChangeText={key => this.updateKey(key)}
                    editable={!confirm}
                    style={confirm ? styles.inputConfirm : null}
                />
                <View style={styles.amount}>
                    <Image style={styles.wollo} source={require('./images/wollo.png')}/>
                    <TextInput
                        dark
                        error={!!amountError}
                        value={this.state.amount}
                        label={strings.transferAmount}
                        placeholder={strings.transferSendWollo}
                        onChangeText={amount => this.updateAmount(amount)}
                        editable={!confirm}
                        style={confirm ? styles.amountInputConfirm : styles.amountInput}
                    />
                </View>
                <Text style={styles.estimate}>
                    {strings.transferSendEstimate} {estimate}
                </Text>
                <TextInput
                    dark
                    error={!!memoError}
                    value={this.state.memo}
                    label={strings.transferMessage}
                    placeholder={confirm ? '' : strings.transferMessagePlaceholder}
                    onChangeText={memo => this.updateMemo(memo)}
                    numberOfLines={1}
                    maxLength={28}
                    editable={!confirm}
                    style={confirm ? styles.inputConfirm : null}
                />
                {confirm ? (
                    <Fragment>
                        <View style={styles.amount}>
                            <Image style={styles.wollo} source={require('./images/wollo.png')}/>
                            <TextInput
                                dark
                                value={getBalanceAfter(this.props.balance, this.state.amount)}
                                label={strings.transferBalanceAfter}
                                editable={false}
                                style={styles.amountInputConfirm}
                            />
                        </View>
                        <Text style={styles.amountMinus}>
                            -{moneyFormat(this.state.amount, COIN_DPS[ASSET_CODE])}
                        </Text>
                    </Fragment>
                ) : null}
                <View style={styles.buttonWrapper}>
                    {confirm ? (
                        <Fragment>
                            <Button
                                label={strings.transferSendButtonLabel}
                                onPress={() => this.send()}
                            />
                            <Button
                                label={strings.transferEditButtonLabel}
                                onPress={() => this.setState({
                                    confirm: false
                                })}
                                outline
                            />
                        </Fragment>
                    ) : (
                        <Button
                            label={strings.transferConfirmButtonLabel}
                            disabled={!(this.state.key && this.state.amount)}
                            onPress={() => this.submit()}
                            outline
                        />
                    )}
                </View>
            </View>
        );
    }
}
