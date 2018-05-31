import React from 'react';
import {connect} from 'react-redux';
import {View} from 'react-native';
import styles from './styles';
import {
    strings,
    SCREEN_ESCROW
} from '../../constants';
import BaseView from '../base-view';
import Pig from '../pig';
import Button from '../button';
import Wollo from '../wollo';
import Payments from '../payments';

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
        <View style={styles.buttonWrapper}>
            <Button
                label={strings.transferButtonLabel}
                onPress={() => navigation.navigate(SCREEN_ESCROW)}
                outline
            />
        </View>
    </BaseView>
));
