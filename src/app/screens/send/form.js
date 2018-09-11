import React, {Component, Fragment} from 'react';
import {View, Text, Image} from 'react-native';
import styles from './styles';
import {strings} from '../../constants';
import Button from '../../components/button';
import TextInput from '../../components/text-input';
import WolloInput from '../../components/wollo-input';
import {isValidPublicKey} from '@pigzbe/stellar-utils';
import moneyFormat from '../../utils/money-format';
import {ASSET_CODE, COIN_SYMBOLS, COIN_DPS} from '../../constants';
import BigNumber from 'bignumber.js';
import {sendWollo} from '../../actions';

const getExchange = (exchange, amount) => {
    const coins = ['GBP', 'USD', 'EUR', 'JPY'];
    return coins.map(coin => {
        const val = amount ? exchange[coin] * Number(amount) : 0;
        return `${COIN_SYMBOLS[coin]}${moneyFormat(val, COIN_DPS[coin])}`;
    }).join(', ');
};

const remainingBalance = (balance, amount) => new BigNumber(balance).minus(amount);

const getBalanceAfter = (balance, amount) => moneyFormat(remainingBalance(balance, amount), COIN_DPS[ASSET_CODE]);

const WolloImage = () => <Image style={styles.wollo} source={require('./images/wollo.png')}/>;

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
    }

    static defaultProps = {
        review: false,
        accountKey: '',
        amount: '',
        memo: '',
    }

    updateKey = accountKey => {
        const keyValid = isValidPublicKey(accountKey);

        this.setState({accountKey, keyValid});
    }

    updateAmount = value => {
        const {balance, exchange} = this.props;

        const amount = value.replace(/[^0-9.]/g, '');
        const amountValid = amount && Number(amount) > 0 && remainingBalance(balance, amount).isGreaterThanOrEqualTo(0);

        this.setState({
            amount,
            amountValid,
        });
    }

    updateMemo = memo => {
        const memoValid = !memo || memo.length < 29;

        this.setState({memo, memoValid});
    }

    submit = () => {
        const {keyValid, amountValid, memoValid} = this.state;
        const review = keyValid && amountValid && memoValid;

        this.setState({
            review,
            keyError: keyValid ? null : new Error(strings.transferErrorInvalidKey),
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

    render() {
        const {
            keyError,
            amountError,
            memoError,
            review
        } = this.state;

        return (
            <View style={styles.containerForm}>
                <TextInput
                    error={!!keyError}
                    value={this.state.accountKey}
                    label={strings.transferSendTo}
                    placeholder={strings.transferSendKey}
                    onChangeText={this.updateKey}
                    editable={!review}
                    style={review ? styles.inputConfirm : null}
                    numberOfLines={3}
                />
                <View style={styles.amount}>
                    <WolloInput
                        error={!!amountError}
                        value={this.state.amount}
                        label={strings.transferAmount}
                        placeholder={strings.transferSendWollo}
                        onChangeText={this.updateAmount}
                        editable={!review}
                        keyboardType="numeric"
                    />
                </View>
                {!review || this.state.memo ? (
                    <TextInput
                        error={!!memoError}
                        value={this.state.memo}
                        label={strings.transferMessage}
                        placeholder={review ? '' : strings.transferMessagePlaceholder}
                        onChangeText={this.updateMemo}
                        maxLength={28}
                        editable={!review}
                        style={review ? styles.inputConfirm : null}
                        numberOfLines={2}
                    />
                ) : null}
                {review ? (
                    <Fragment>
                        <View style={styles.amount}>
                            <WolloInput
                                value={getBalanceAfter(this.props.balance, this.state.amount)}
                                label={strings.transferBalanceAfter}
                                editable={false}
                            />
                        </View>
                        <Text style={styles.amountMinus}>
                            -{moneyFormat(this.state.amount, COIN_DPS[ASSET_CODE])}
                        </Text>
                    </Fragment>
                ) : null}
                {review && (
                    <View style={styles.edit}>
                        <Button
                            theme="plain"
                            style={styles.editBtn}
                            textStyle={styles.editText}
                            label={strings.transferEditButtonLabel}
                            onPress={this.edit}
                        />
                    </View>
                )}
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
}
