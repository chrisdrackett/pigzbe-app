import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import {View} from 'react-native';
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
import KeyboardAvoid from '../keyboard-avoid';
import Form from './form';

export default connect(
    state => ({
        error: state.wollo.error,
        balance: state.wollo.balance,
        exchange: state.coins.exchange,
    })
)(({
    balance,
    exchange,
    navigation,
    error
}) => (
    <Fragment>
        <BaseView error={error}>
            <KeyboardAvoid>
                <Wollo balance={balance}/>
                <Pig style={styles.pig}/>
                <View style={styles.containerBody}>
                    <Form
                        exchange={exchange}
                        balance={balance}
                    />
                    <Button
                        label={strings.transferCancelButtonLabel}
                        onPress={() => navigation.navigate(SCREEN_TRANSFER)}
                        outline
                    />
                </View>
            </KeyboardAvoid>
        </BaseView>
        <Footer/>
    </Fragment>
));
