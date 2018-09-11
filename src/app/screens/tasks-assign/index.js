import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Text, View} from 'react-native';
import Button from '../../components/button';
import {SCREEN_BALANCE, SCREEN_TASKS_LIST} from '../../constants';
import StepModule from '../../components/step-module';
import WolloInput from '../../components/wollo-input';
import Paragraph from '../../components/paragraph';
import {color} from '../../styles';
import {familyAssignTask} from '../../actions';


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

    componentWillMount() {
        console.log('mounting tasks assign screen');
    }

    onBack = () => this.props.navigation.navigate(SCREEN_TASKS_LIST);

    onChangeAmount = wollos => {
        this.setState({wollos});
    }

    next = async () => {
        await this.props.dispatch(familyAssignTask(this.props.kid, this.props.task, this.state.wollos));

        // todo navigate to kids screen instead
        this.props.navigation.navigate(SCREEN_BALANCE);
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
                            Set the reward that <Text style={{fontWeight: 'bold'}}>{kid}</Text> will get when completed
                        </Paragraph>
                        <WolloInput
                            currency="GBP"
                            exchange={0.091956}
                            onChangeAmount={this.onChangeAmount}
                        />
                    </View>
                    <Button
                        style={sendButton}
                        label={`Send to ${this.props.kid}`}
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
        loading: state.tasks.loading,
        kid: props.navigation.state.params.kid,
        task: props.navigation.state.params.task,
    })
)(TasksAssign);
