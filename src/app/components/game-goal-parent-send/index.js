
import React, {Component} from 'react';
import {View} from 'react-native';
import Button from 'app/components/button';
import WolloSlider from 'app/components/wollo-slider';

import styles from './styles';

export default class GameGoalParentSend extends Component {
    state = {
        amount: 0,
    }
    render() {
        const {goalBalance} = this.props;
        return (
            <View style={styles.box}>
                <WolloSlider
                    actionLabel="Select amount to send"
                    sliderValueToAmount={value => {
                        // between 0 and goalBalance
                        return Math.round(goalBalance * value);
                    }}
                    onChange={amount => this.setState({amount})}
                />
                <Button
                    label="Send Wollo"
                    disabled={this.state.amount === 0 || !this.state.goalAddress}
                    onPress={() => {
                        alert(`${this.state.goalAddress} ${this.state.amount}`)
                    }}
                />
            </View>
        )
    }
}
