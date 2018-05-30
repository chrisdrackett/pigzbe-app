import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
    Text,
    View,
    FlatList,
    ScrollView
} from 'react-native';
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

class Transfer extends Component {

    render () {
        const {
            balance,
            navigation,
            error
        } = this.props;

        return (
            <BaseView scrollViewStyle={styles.container} error={error}>
                <Wollo balance={balance}/>
                <Pig style={styles.pig}/>

                <Payments/>

                <View style={styles.buttonWrapper}>
                    <Button
                        label={'Transfer Wollo'}
                        onPress={() => navigation.navigate(SCREEN_ESCROW)}
                        outline
                    />
                </View>

            </BaseView>
        );
    }
}

// export for test
export const TransferComponent = Transfer;

export default connect(
    state => ({
        error: state.wollo.error,
        balance: state.wollo.balance
    })
)(Transfer);
