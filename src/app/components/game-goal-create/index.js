
import React, {Component} from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import TextInput from 'app/components/text-input';
import Button from 'app/components/button';
import WolloSlider from 'app/components/wollo-slider';
import {assignGoal} from 'app/actions';
import styles from './styles';

export class GameGoalCreate extends Component {
    state = {
        name: '',
        amount: 0,
    }
    render() {
        return (
            <View style={styles.box}>
                <TextInput
                    placeholder="Goal Description"
                    onChangeText={name => this.setState({name})}
                    value={this.state.name}
                />

                <WolloSlider
                    actionLabel="Select goal amount"
                    sliderValueToAmount={value => {
                        const minp = 0; // Input between 0 and 1
                        const maxp = 1;
                        const minv = Math.log(10); // End result between 10 and 9999
                        const maxv = Math.log(9999);
                        const scale = (maxv-minv) / (maxp-minp);
                        return Math.round(Math.exp(minv + scale*(value-minp)));
                    }}
                    onChange={amount => this.setState({amount})}
                />

                <Button
                    label="Create saving goal"
                    disabled={this.state.amount === 0 || this.state.name.length === 0}
                    onPress={() => {
                        this.props.addGoal(this.state.name, this.state.amount);
                    }}
                />
            </View>
        )
    }
}

export default connect(
    state => ({
        loading: state.kids.goalLoading,
    }),
    (dispatch, ownProps) => ({
        addGoal: (name, amount) => dispatch(assignGoal(ownProps.kid, name, amount))
    })
)(GameGoalCreate);
