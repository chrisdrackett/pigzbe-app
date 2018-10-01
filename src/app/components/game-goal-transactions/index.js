
import React, {Component} from 'react';
import {View, Text} from 'react-native';
import Payments from 'app/components/payments';

import styles from './styles';

export default class GameGoalTransactions extends Component {
    render() {
        return (
            <View style={styles.box}>
                <Payments address={this.props.goalAddress} />
            </View>
        )
    }
}
