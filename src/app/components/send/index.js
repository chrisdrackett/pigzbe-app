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
import Progress from '../progress';

export default connect(
    state => ({
        error: state.wollo.error,
        balance: state.wollo.balance,
        exchange: state.coins.exchange,
        sending: state.wollo.sending,
        sendStatus: state.wollo.sendStatus,
        sendComplete: state.wollo.sendComplete,
    })
)(({
    dispatch,
    balance,
    exchange,
    sending,
    sendStatus,
    sendComplete,
    navigation,
    error
}) => {
    console.log('error', error);
    console.log('sending', sending);
    console.log('sendStatus', sendStatus);
    console.log('sendComplete', sendComplete);
    return (
        <Fragment>
            <BaseView error={error}>
                <KeyboardAvoid header>
                    <Wollo balance={balance}/>
                    <Pig style={styles.pig}/>
                    <View style={styles.containerBody}>
                        <Form
                            dispatch={dispatch}
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
            <Progress
                active={sending}
                complete={sendComplete}
                title={strings.transferProgress}
                error={error}
                text={sendStatus}
                buttonLabel={strings.transferProgressButtonLabel}
                onPress={() => {
                    navigation.navigate(SCREEN_TRANSFER);
                }}
            />
            <Footer/>
        </Fragment>
    );
});
