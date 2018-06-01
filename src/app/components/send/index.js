import React from 'react';
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
import Title from '../title';

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
        <Wollo balance={balance}/>
        <Pig style={styles.pig}/>
        <View style={styles.containerBody}>
            <Title>{strings.transferSendTitle}</Title>
        </View>
        <Footer>
            <Button
                label={strings.transferCancelButtonLabel}
                onPress={() => navigation.navigate(SCREEN_TRANSFER)}
                outline
            />
        </Footer>
    </BaseView>
));
