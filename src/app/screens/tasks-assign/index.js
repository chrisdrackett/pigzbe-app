import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Text} from 'react-native';
import Button from '../../components/button';
import {SCREEN_BALANCE, SCREEN_TASKS_LIST} from '../../constants';
import StepModule from '../../components/step-module';
import TextInput from '../../components/text-input';
import {color} from '../../styles';
import {familyAssignTask} from '../../actions';


const textStyle = {
    color: color.blue,
    fontSize: 16,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 30,
    textAlign: 'center',
};

export class TasksAssign extends Component {
    state = {
        wollos: 0,
    }

    componentWillMount() {
        console.log('mounting tasks assign screen');
    }

    onBack = () => this.props.navigation.navigate(SCREEN_TASKS_LIST);

    onChangeText = (wollos) => {
        this.setState({wollos});
    }

    next = async () => {
        await this.props.dispatch(familyAssignTask(this.props.kid, this.props.task, this.state.wollos));

        // todo navigate to kids screen instead
        this.props.navigation.navigate(SCREEN_BALANCE);
    }

    render() {
        const {wollos} = this.state;

        console.log(this.props);

        const {
            tasks,
            loading,
            kid,
        } = this.props;

        console.log('wollos', wollos, loading, tasks);

        return (
            <StepModule
                title="Tasks"
                icon="family"
                content={'Please choose a task from below list'}
                pad
                loading={this.state.loading}
                onBack={this.onBack}
            >
                <Text style={textStyle}>
                    Set the reward that <Text style={{fontWeight: 'bold'}}>{kid}</Text> will get when completed
                </Text>
                <TextInput
                    numberOfLines={1}
                    placeholder="wollos"
                    onChangeText={this.onChangeText}
                    returnKeyType="done"
                />
                <Button
                    label={`Send to ${this.props.kid}`}
                    onPress={this.next}
                    disabled={this.state.wollos === 0}
                />
            </StepModule>
        );
    }
}

export default connect(
    (state, props) => ({
        tasks: state.tasks.tasks,
        loading: state.tasks.loading,
        kid: props.navigation.state.params.kid,
        task: props.navigation.state.params.task,
    })
)(TasksAssign);
