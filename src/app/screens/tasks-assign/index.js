import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, Text} from 'react-native';
import Button from '../../components/button';
import {SCREEN_TASKS_LIST} from '../../constants';
import StepModule from '../../components/step-module';
import TextInput from '../../components/text-input';
// import {color} from '../../styles';
import {tasksAssignTask} from '../../actions';


export class TasksAssign extends Component {
    state = {
        wollows: 0,
    }

    componentWillMount() {
        console.log('mounting tasks assign screen');
    }

    onBack = () => this.props.navigation.navigate(SCREEN_TASKS_LIST);

    onChangeText = (wollows) => {
        this.setState({wollows});
    }

    next = async () => {
        await this.props.dispatch(tasksAssignTask(this.state.newTask));
        console.log('redirect to kid screen', this.state.active);
    }

    render() {
        const {wollows} = this.state;

        const {
            tasks,
            loading,
        } = this.props;

        console.log('wollows', wollows, loading, tasks);

        return (
            <StepModule
                title="Tasks"
                icon="family"
                content={'Please choose a task from below list'}
                pad
                loading={this.state.loading}
                onBack={this.onBack}
            >
                <Text>
                    Set the reward that <Text style={{fontWeight: 'bold'}}>Ella</Text> will get when completed
                </Text>
                <TextInput
                    numberOfLines={1}
                    placeholder="wollows"
                    onChangeText={this.onChangeText}
                    returnKeyType="done"
                />
                <Button
                    label={'Assign task to ....'}
                    onPress={this.next}
                    disabled={this.state.wollos === 0}
                />
            </StepModule>
        );
    }
}

export default connect(
    state => ({
        tasks: state.tasks.tasks,
        loading: state.tasks.loading
    })
)(TasksAssign);
