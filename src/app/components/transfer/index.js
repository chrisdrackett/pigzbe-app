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
import {wolloError} from '../../actions';

export default connect(
    state => ({
        error: state.wollo.error,
        balance: state.wollo.balance,
        balanceXLM: state.wollo.balanceXLM,
        minXLM: state.wollo.minXLM,
        hasGas: state.wollo.hasGas,
    })
)(({
    dispatch,
    balance,
    balanceXLM,
    minXLM,
    hasGas,
    navigation,
    error,
}) => (
    <BaseView scrollViewStyle={styles.container} error={error}>
        <Wollo balance={balance}/>
        <Pig style={styles.pig}/>
        <Payments/>
        <Footer>
            <Button
                label={strings.transferButtonLabel}
                onPress={() => {
                    if (!hasGas) {
                        const errMsg = `Not enough gas for transaction (Balance ${balanceXLM}XLM. Required ${minXLM}XLM)`;
                        dispatch(wolloError(new Error(errMsg)));
                        return;
                    }
                    navigation.navigate(SCREEN_SEND);
                }}
                disabled={!hasGas}
                outline
            />
        </Footer>
    </BaseView>
));
