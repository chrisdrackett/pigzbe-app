import React, {Component, Fragment} from 'react';
import {View, Text, Image} from 'react-native';
import styles from './styles';
import {strings} from '../../constants';
import Button from '../../components/button';
import TextInput from '../../components/text-input';
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

    updateKey = key => {
        const keyValid = isValidPublicKey(key);

        this.setState({key, keyValid});
    }

    updateAmount = value => {
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

    updateMemo = memo => {
        const memoValid = !memo || memo.length < 29;

        this.setState({memo, memoValid});
    }

    submit = () => {
        const {keyValid, amountValid, memoValid} = this.state;
        const confirm = keyValid && amountValid && memoValid;

        this.setState({
            confirm,
            keyError: keyValid ? null : new Error(strings.transferErrorInvalidKey),
            amountError: amountValid ? null : new Error(strings.transferErrorInvalidAmount),
            memoError: memoValid ? null : new Error(strings.transferErrorInvalidMessage)
        });

        this.props.onReview(confirm);
    }

    send = () => {
        const {dispatch} = this.props;
        const {key, amount, memo} = this.state;

        dispatch(sendWollo(key, amount, memo));
    }

    edit = () => {
        this.setState({confirm: false});
        this.props.onReview(false);
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
                <TextInput
                    dark
                    error={!!keyError}
                    value={this.state.key}
                    label={strings.transferSendTo}
                    placeholder={strings.transferSendKey}
                    onChangeText={this.updateKey}
                    editable={!confirm}
                    style={confirm ? styles.inputConfirm : null}
                    numberOfLines={2}
                />
                <View style={styles.amount}>
                    <Image style={styles.wollo} source={require('./images/wollo.png')}/>
                    <TextInput
                        dark
                        error={!!amountError}
                        value={this.state.amount}
                        label={strings.transferAmount}
                        placeholder={strings.transferSendWollo}
                        onChangeText={this.updateAmount}
                        editable={!confirm}
                        style={confirm ? styles.amountInputConfirm : styles.amountInput}
                        keyboardType="numeric"
                    />
                </View>
                <Text style={styles.estimate}>
                    {strings.transferSendEstimate} {estimate}
                </Text>
                {!confirm || this.state.memo ? (
                    <TextInput
                        dark
                        error={!!memoError}
                        value={this.state.memo}
                        label={strings.transferMessage}
                        placeholder={confirm ? '' : strings.transferMessagePlaceholder}
                        onChangeText={this.updateMemo}
                        maxLength={28}
                        editable={!confirm}
                        style={confirm ? styles.inputConfirm : null}
                        numberOfLines={2}
                    />
                ) : null}
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
                {confirm && (
                    <View style={{position: 'absolute', top: 0, right: 0}}>
                        <Button
                            theme="plain"
                            style={{alignSelf: 'auto', marginBottom: 0}}
                            textStyle={{paddingRight: 5, paddingTop: 8, paddingBottom: 8}}
                            label={strings.transferEditButtonLabel}
                            onPress={this.edit}
                        />
                    </View>
                )}
                <View style={styles.buttonWrapper}>
                    {confirm ? (
                        <Button
                            label={'Transfer'}
                            onPress={this.send}
                        />
                    ) : (
                        <Button
                            label={strings.transferConfirmButtonLabel}
                            disabled={!(this.state.key && this.state.amount)}
                            onPress={this.submit}
                        />
                    )}
                </View>
            </View>
        );
    }
}
