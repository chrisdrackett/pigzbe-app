
import React, {Component} from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import Button from 'app/components/button';
import WolloSlider from 'app/components/wollo-slider';
import {sendGoalWolloToParent} from 'app/actions';
import styles from './styles';

export class GameGoalParentSend extends Component {
    state = {
        amount: 0,
        onWolloMoved: () => {},
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
                    disabled={this.state.amount === 0}
                    onPress={async () => {
                        await this.props.sendToParent(this.state.amount);
                        this.props.onWolloMoved();
                    }}
                />
            </View>
        )
    }
}

export default connect(
    state => ({}),
    (dispatch, ownProps) => ({
        sendToParent: async (amount) => dispatch(sendGoalWolloToParent(ownProps.goalAddress, amount))
    })
)(GameGoalParentSend);
