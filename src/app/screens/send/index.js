import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import {View, ScrollView} from 'react-native';
import styles from './styles';
import {
    strings,
    SCREEN_TRANSFER
} from '../../constants';
import Pig from '../../components/pig';
import Button from '../../components/button';
import Wollo from '../../components/wollo';
import Footer from '../../components/footer';
import KeyboardAvoid from '../../components/keyboard-avoid';
import Form from './form';
import Progress from '../../components/progress';
import Header from '../../components/header';

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
}) => (
    <Fragment>
        <KeyboardAvoid containerStyle={{flexGrow: 1}}>
            <ScrollView style={styles.scrollView} contentContainerStyle={[styles.contentContainer, styles.container]} bounces={false}>
                <Header/>
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
            </ScrollView>
        </KeyboardAvoid>
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
));
