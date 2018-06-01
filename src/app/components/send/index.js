import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Text, Image} from 'react-native';
import styles from './styles';
import {
    strings,
    SCREEN_TRANSFER
} from '../../constants';
import BaseView from '../base-view';
import Pig from '../pig';
import Button from '../button';
import Wollo from '../wollo';
import Footer from '../footer';
import Title from '../title';
import TextInput from '../text-input';
import KeyboardAvoid from '../keyboard-avoid';
import {isValidPublicKey} from '../../stellar/validation';

class Form extends Component {
    state ={
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
        estimate: '£0.00, $0.00, €0.00, ¥0'
    }

    updateKey(key) {
        const keyValid = isValidPublicKey(key);

        this.setState({key, keyValid});
    }

    updateAmount(value) {
        const amount = value.replace(/[^0-9.]/g, '');
        const amountValid = amount && Number(amount) > 0;
        const estimate = `£${amount * 0.08}, $${amount * 0.12}, €${amount * 1}, ¥${amount * 10}`;

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
            isValid: keyValid && amountValid && memoValid,
            keyError: keyValid ? null : new Error('Invalid key'),
            amountError: amountValid ? null : new Error('Invalid amount'),
            memoError: memoValid ? null : new Error('Invalid message')
        });
    }

    render() {
        const {
            estimate,
            keyError,
            amountError,
            memoError,
        } = this.state;

        return (
            <View style={styles.containerForm}>
                <TextInput
                    dark
                    error={!!keyError}
                    value={this.state.key}
                    label={strings.transferSendTo}
                    placeholder={strings.transferSendKey}
                    onChangeText={key => this.updateKey(key)}
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
                        style={styles.amountInput}
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
                    placeholder={strings.transferMessagePlaceholder}
                    onChangeText={memo => this.updateMemo(memo)}
                    numberOfLines={1}
                    maxLength={28}
                />
                <Button
                    label={strings.transferConfirmButtonLabel}
                    // disabled={!(keyValid && amountValid && memoValid)}
                    disabled={!(this.state.key && this.state.amount)}
                    onPress={() => this.submit()}
                    outline
                />
            </View>
        );
    }
}

export default connect(
    state => ({
        error: state.wollo.error,
        balance: state.wollo.balance
    })
)(({
    balance,
    navigation,
    error
}) => (
    <BaseView scrollViewStyle={styles.container} error={error}>
        <KeyboardAvoid>
            <Wollo balance={balance}/>
            <Pig style={styles.pig}/>
            <View style={styles.containerBody}>
                <Title>{strings.transferSendTitle}</Title>
                <Form/>
                <Button
                    label={strings.transferCancelButtonLabel}
                    onPress={() => navigation.navigate(SCREEN_TRANSFER)}
                    outline
                />
            </View>
            <Footer />
        </KeyboardAvoid>
    </BaseView>
));
