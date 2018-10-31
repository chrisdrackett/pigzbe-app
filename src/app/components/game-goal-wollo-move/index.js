
import React, {Component} from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import SelectInput from 'app/components/select-input';
import Button from 'app/components/button';
import WolloSlider from 'app/components/wollo-slider';
import {moveGoalWollo} from 'app/actions';
import styles from './styles';

export class GameGoalWolloMove extends Component {
    static defaultProps = {
        goals: [],
        onWolloMoved: () => {},
    }
    state = {
        goalId: null,
        amount: 0,
    }
    render() {
        const {goals, goalBalance} = this.props;
        return (
            <View style={styles.box}>
                <SelectInput
                    value={this.state.goalId}
                    placeholder={'Move to tree'}
                    onChangeSelection={goalId => this.setState({goalId})}
                    options={goals.reduce((obj, goal) => {
                        obj[goal.id] = goal.name;
                        return obj;
                    }, {})}
                />

                <WolloSlider
                    actionLabel="Select amount to move"
                    sliderValueToAmount={value => {
                        // between 0 and goalBalance
                        if (Number(goalBalance) < 2) {
                            return Math.round(goalBalance * value * 10) / 10;
                        }
                        return Math.round(goalBalance * value);
                    }}
                    onChange={amount => this.setState({amount})}
                />
                <Button
                    label="Move Wollo"
                    disabled={this.state.amount === 0 || !this.state.goalId}
                    onPress={async () => {
                        await this.props.moveWollo(this.state.goalId, this.state.amount);
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
        moveWollo: async (destinationGoalId, amount) => dispatch(moveGoalWollo(ownProps.kid, ownProps.goalId, destinationGoalId, amount))
    })
)(GameGoalWolloMove);
