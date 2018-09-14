import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Text, View} from 'react-native';
import Button from '../../components/button';
import {SCREEN_CHILD_DASH, SCREEN_TASKS_LIST} from '../../constants';
import StepModule from '../../components/step-module';
import WolloInput from '../../components/wollo-input';
import Paragraph from '../../components/paragraph';
import {color} from '../../styles';
import {familyDeleteTask, familyAssignTask} from '../../actions';


const textStyle = {
    color: color.blue,
    fontSize: 16,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 30,
    marginTop: 20,
    textAlign: 'center',
};

const sendButton = {
    marginTop: 20,
};

const flexStyle = {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-between',
};


export class TasksAssign extends Component {
    state = {
        wollos: 0,
    }

    constructor(props) {
        super(props);

        console.log('++++ this.props.taskToEdit', props.taskToEdit);

        this.state = {
            wollos: props.taskToEdit ? props.taskToEdit.reward : 0,
        };
    }

    onBack = () => this.props.navigation.navigate(SCREEN_TASKS_LIST, {kid: this.props.kid});

    onChangeAmount = wollos => {
        this.setState({wollos});
    }

    next = async () => {
        if (this.props.taskToEdit) {
            await this.props.dispatch(familyDeleteTask(this.props.kid.name, this.props.taskToEdit.task));
        }

        await this.props.dispatch(familyAssignTask(this.props.kid, this.props.task, this.state.wollos));
        this.props.navigation.navigate(SCREEN_CHILD_DASH, {kid: this.props.kid});
    }

    render() {
        const {wollos} = this.state;

        const {
            loading,
            kid,
        } = this.props;

        return (
            <StepModule
                pad
                loading={loading}
                onBack={this.onBack}
                plain
                customTitle={'Tasks'}
            >
                <View style={flexStyle}>
                    <View>
                        <Paragraph style={textStyle}>
                            Set the reward that <Text style={{fontWeight: 'bold'}}>{kid.name}</Text> will get when completed
                        </Paragraph>
                        <WolloInput
                            currency="GBP"
                            exchange={0.091956}
                            onChangeAmount={this.onChangeAmount}
                            initial={wollos}
                        />
                    </View>
                    <Button
                        style={sendButton}
                        label={`Send to ${kid.name}`}
                        onPress={this.next}
                        disabled={wollos === 0}
                    />
                </View>
            </StepModule>
        );
    }
}

export default connect(
    (state, props) => ({
        loading: state.family.loading,
        kid: props.navigation.state.params.kid,
        task: props.navigation.state.params.task,
        taskToEdit: props.navigation.state.params.taskToEdit,
    })
)(TasksAssign);
