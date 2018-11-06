import React, {Component, Fragment} from 'react';
import {Text, View, Keyboard} from 'react-native';
import {connect} from 'react-redux';
import StepModule from 'app/components/step-module';
import Paragraph from 'app/components/paragraph';
import TextInput from 'app/components/text-input';
import Button from 'app/components/button';
import WolloInput from 'app/components/wollo-input';
import styles from './styles';
import {assignGoal, updateGoal} from 'app/actions';

export class KidGoalAdd extends Component {
    constructor(props) {
        super(props);
        const {goal} = props;
        this.state = {
            step: 'name',
            name: goal ? goal.name : '',
            amount: goal ? goal.reward : 0,
        };
    }

    onBack = () => {
        if (this.state.step === 'amount') {
            this.setState({step: 'name'});
        } else {
            this.props.navigation.goBack();
        }
    };

    onAddGoal = async () => {
        Keyboard.dismiss();

        if (this.props.goal) {
            await this.props.dispatch(updateGoal(this.props.kid, this.state.name, this.state.amount, this.props.goal.id));
        } else {
            await this.props.dispatch(assignGoal(this.props.kid, this.state.name, this.state.amount));
        }
        this.props.navigation.goBack();
    }

    onChangeName = name => this.setState({name})

    onChangeAmount = amount => this.setState({amount})

    onStepAmount = () => this.setState({step: 'amount'})

    render() {
        const {step, name, amount} = this.state;
        const {kid, loading, goal} = this.props;

        return (
            <StepModule
                //customTitle="Goal"
                title="Create goal"
                loading={loading}
                loaderMessage="Adding goal..."
                pad
                onBack={this.onBack}
                justify="space-between"
                icon="coins"
                keyboardAvoidPad
                keyboardOffset={40}
            >
                <View style={styles.form}>
                    {step === 'name' &&
                        <Fragment>
                            <Paragraph>{goal ? 'Update the' : 'Create a'} goal for <Text style={styles.name}>{kid.name}</Text> to save towards</Paragraph>
                            <TextInput
                                value={name}
                                placeholder={'Goal description'}
                                onChangeText={this.onChangeName}
                            />
                        </Fragment>
                    }
                    {step === 'amount' &&
                        <Fragment>
                            <Paragraph>Set the goal value that <Text style={styles.name}>{kid.name}</Text> needs to save</Paragraph>
                            <WolloInput
                                initialAmount={this.state.amount}
                                onChangeAmount={this.onChangeAmount}
                            />
                        </Fragment>
                    }
                </View>
                <View>
                    {step === 'name' &&
                        <Button
                            disabled={name.length < 3}
                            label="Next"
                            onPress={this.onStepAmount}
                        />
                    }
                    {step === 'amount' &&
                        <Button
                            disabled={Number(amount) === 0}
                            label={goal ? 'Update Goal' : 'Set Goal'}
                            onPress={this.onAddGoal}
                        />
                    }
                </View>
            </StepModule>
        );
    }
}

export default connect(
    (state, props) => ({
        kid: state.kids.kids.find(k => k.address === props.navigation.state.params.kid.address),
        goal: props.navigation.state.params.goal,
        loading: state.kids.goalLoading,
    })
)(KidGoalAdd);
