
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
        const {goal} = this.props;
        return (
            <View style={styles.box}>
                <WolloSlider
                    actionLabel="Select amount to send"
                    sliderValueToAmount={value => {
                        // between 0 and goalBalance
                        if (Number(goal.balance) < 2) {
                            return Math.round(goal.balance * value * 10) / 10;
                        }
                        return Math.round(goal.balance * value);
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
        );
    }
}

export default connect(
    state => ({}),
    (dispatch, ownProps) => ({
        sendToParent: async (amount) => dispatch(sendGoalWolloToParent(ownProps.kid, ownProps.goal, amount))
    })
)(GameGoalParentSend);
