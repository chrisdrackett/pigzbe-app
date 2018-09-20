import React, {Component, Fragment} from 'react';
import {Text, View} from 'react-native';
import {connect} from 'react-redux';
import {SCREEN_KID_DASHBOARD} from '../../constants';
import StepModule from 'app/components/step-module';
import Paragraph from 'app/components/paragraph';
import TextInput from 'app/components/text-input';
import Button from 'app/components/button';
import WolloInput from 'app/components/wollo-input';
import styles from './styles';
import {assignGoal} from 'app/actions';

export class KidGoalAdd extends Component {
    state = {
        step: 'name',
        name: '',
        amount: '',
    }

    onBack = () => {
        if (this.state.step === 'amount') {
            this.setState({step: 'name'});
        } else {
            this.props.navigation.navigate(SCREEN_KID_DASHBOARD, {kid: this.props.kid});
        }
    };

    onAddGoal = async () => {
        await this.props.dispatch(assignGoal(this.props.kid, this.state.name, this.state.amount));
        this.props.navigation.navigate(SCREEN_KID_DASHBOARD, {kid: this.props.kid});
    }

    render() { 
        const {step, name, amount} = this.state;
        const {kid, loading} = this.props;
        return (
            <StepModule
                customTitle="Goal"
                loading={loading}
                loaderMessage="Adding goal..."
                pad
                onBack={this.onBack}
                justify="space-between"
            >
                <View style={styles.form}>
                    {step === 'name' &&
                        <Fragment>
                            <Paragraph>Create a goal for <Text style={styles.name}>{kid.name}</Text> to save towards</Paragraph>
                            <TextInput
                                value={name}
                                placeholder={'Goal description'}
                                onChangeText={name => this.setState({name})}
                            />
                        </Fragment>
                    }
                    {step === 'amount' &&
                        <Fragment>
                            <Paragraph>Set the goal value that <Text style={styles.name}>{kid.name}</Text> needs to save</Paragraph>
                            <WolloInput
                                onChangeAmount={amount => this.setState({amount})}
                            />
                        </Fragment>
                    }
                </View>
                <View>
                    {step === 'name' &&
                        <Button
                            disabled={name.length < 3}
                            label="Next"
                            onPress={() => this.setState({step: 'amount'})}
                        />
                    }
                    {step === 'amount' &&
                        <Button
                            disabled={amount == 0}
                            label="Set Goal"
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
        loading: state.kids.goalLoading,
    })
)(KidGoalAdd);
