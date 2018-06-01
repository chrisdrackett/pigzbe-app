import React from 'react';
import {connect} from 'react-redux';
import styles from './styles';
import {
    strings,
    SCREEN_SEND
} from '../../constants';
import BaseView from '../base-view';
import Pig from '../pig';
import Button from '../button';
import Wollo from '../wollo';
import Payments from '../payments';
import Footer from '../footer';

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
        <Payments/>
        <Footer>
            <Button
                label={strings.transferButtonLabel}
                onPress={() => navigation.navigate(SCREEN_SEND)}
                outline
            />
        </Footer>
    </BaseView>
));
