import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, FlatList, TouchableOpacity, Text} from 'react-native';
import Button from '../../components/button';
import {SCREEN_TASKS_ASSIGN} from '../../constants';
import StepModule from '../../components/step-module';
import TextInput from '../../components/text-input';
import Toggle from '../../components/toggle';
import {addCustomTask, loadCustomTasks} from '../../actions';
import styles from './styles';

export class TasksList extends Component {
    state = {
        newTask: '',
        loading: false,
        showingInput: false,
        active: this.props.taskToEdit ? this.props.taskToEdit.name : null,
    }

    componentWillMount() {
        this.props.dispatch(loadCustomTasks());
    }

    getTasksList = () => this.props.tasks.map(task => ({
        key: task,
    }));

    onBack = () => this.props.navigation.goBack();

    onChangeText = newTask => this.setState({newTask})

    showInput = () => this.setState({showingInput: true, active: null});

    cancelInput = () => this.setState({showingInput: false, newTask: null});

    onNext = async () => {
        const {showingInput, newTask, active} = this.state;

        if (showingInput && newTask) {
            await this.props.dispatch(addCustomTask(newTask));
            this.setState({newTask: null, showingInput: false});
        }

        this.props.navigation.push(SCREEN_TASKS_ASSIGN, {
            kid: this.props.kid,
            task: newTask ? newTask : active,
            taskToEdit: this.props.taskToEdit
        });
    }

    render() {
        const {showingInput, active, newTask} = this.state;
        const {loading} = this.props;

        return (
            <StepModule
                title="Tasks"
                icon="family"
                content={'Please choose a task from below list'}
                pad
                loading={loading}
                onBack={this.onBack}
            >
                <View style={styles.flexStyle}>
                    <View>
                        <FlatList
                            style={{marginBottom: 10}}
                            data={
                                this.getTasksList()
                            }
                            renderItem={({item}) => (<Toggle
                                innerStyle={styles.innerStyle}
                                label={item.key}
                                onPress={() => {
                                    this.setState({active: item.key});
                                }}
                                active={active === item.key}
                                disabled={showingInput}
                            />)
                            }
                        />
                        {
                            showingInput ?
                                <View>
                                    <TextInput
                                        numberOfLines={1}
                                        placeholder="New Task"
                                        onChangeText={this.onChangeText}
                                        returnKeyType="done"
                                        value={this.state.newTask}
                                        autoFocus={true}
                                    />
                                    <TouchableOpacity
                                        onPress={this.cancelInput}
                                        style={styles.cancelStyle}
                                    >
                                        <Text
                                            style={styles.cancelInner}
                                        >
                                            Cancel
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                :
                                <TouchableOpacity
                                    onPress={this.showInput}
                                    style={styles.cancelStyle}
                                >
                                    <Text
                                        style={styles.cancelInner}
                                    >
                                        Add another
                                    </Text>
                                </TouchableOpacity>
                        }
                    </View>
                    <View style={{marginTop: 20}}>
                        {
                            <Button
                                label={'Next'}
                                onPress={this.onNext}
                                disabled={showingInput && !newTask || !showingInput && !active}
                            />
                        }
                    </View>
                </View>
            </StepModule>
        );
    }
}

export default connect(
    (state, props) => ({
        tasks: state.tasks.tasks.concat(state.tasks.defaultTasks),
        loading: state.tasks.loading,
        kid: props.navigation.state.params.kid,
        taskToEdit: props.navigation.state.params.taskToEdit,
    })
)(TasksList);
