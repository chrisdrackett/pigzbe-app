import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, FlatList, TouchableOpacity, Text} from 'react-native';
import Button from '../../components/button';
import {SCREEN_DASHBOARD, SCREEN_TASKS_ASSIGN} from '../../constants';
import StepModule from '../../components/step-module';
import TextInput from '../../components/text-input';
import Toggle from '../../components/toggle';
import {color} from '../../styles';
import {addCustomTask, loadCustomTasks} from '../../actions';

const buttonStyle = {
    background: 'transparent',
    border: color.blue,
    fontSize: 14,
    paddingTop: 10,
    height: 45,
    lineHeight: 40,
    marginBottom: 20,
    width: '100%',
    textAlign: 'center',
};

const innerStyle = {
    borderRadius: 5,
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    height: 45,
};

const cancelStyle = {
    marginLeft: 'auto',
    marginRight: 'auto',
    borderBottomWidth: 1,
    borderBottomColor: color.blue,
};

const cancelInner = {
    color: color.blue,
    fontSize: 14,
};

const flexStyle = {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-between',
};

export class TasksList extends Component {
    constructor(props) {
        super(props);

        console.log('++++ this.props.taskToEdit', props.taskToEdit);

        this.state = {
            loading: false,
            showingInput: false,
            tasks: ['wash dishes', 'clean room', 'do your homework'],
            active: props.taskToEdit ? props.taskToEdit.task : null,
        };
    }

    componentWillMount() {
        this.props.dispatch(loadCustomTasks());
    }

    getTasksList = () => this.props.tasks.map(task => ({
        key: task,
    }));

    onBack = () => this.props.navigation.navigate(SCREEN_DASHBOARD);

    onChangeText = (task) => {
        this.setState({newTask: task});
    }

    showInput = () => this.setState({showingInput: true, active: null});

    cancelInput = () => this.setState({showingInput: false, newTask: null});

    next = async () => {
        const {showingInput, newTask, active} = this.state;

        if (showingInput) {
            await this.props.dispatch(addCustomTask(this.state.newTask));
        }

        this.props.navigation.navigate(SCREEN_TASKS_ASSIGN, {kid: this.props.kid, task: newTask ? newTask : active, taskToEdit: this.props.taskToEdit});
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
                <View style={flexStyle}>
                    <View>
                        <FlatList
                            style={{marginBottom: 10}}
                            data={
                                this.getTasksList()
                            }
                            renderItem={({item}) => (<Toggle
                                style={buttonStyle}
                                innerStyle={innerStyle}
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
                                    />
                                    <TouchableOpacity
                                        onPress={this.cancelInput}
                                        style={cancelStyle}
                                    >
                                        <Text
                                            style={cancelInner}
                                        >
                                            Cancel
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                :
                                <TouchableOpacity
                                    onPress={this.showInput}
                                    style={cancelStyle}
                                >
                                    <Text
                                        style={cancelInner}
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
                                onPress={this.next}
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
