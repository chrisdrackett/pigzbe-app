import React, {Component} from 'react';
import {connect} from 'react-redux';
import {View, FlatList, Text} from 'react-native';
import Button from '../../components/button';
import {SCREEN_BALANCE} from '../../constants';
import StepModule from '../../components/step-module';
import TextInput from '../../components/text-input';
// import {familyAddKid} from '../../actions';

export class TasksList extends Component {
    state = {
        loading: false,
        showingInput: false,
        tasks: ['wash dishes', 'clean room', 'do your homework'],
    }

    getTasksList = () => this.state.tasks.map(task => ({
        key: task,
    }));

    onBack = () => this.props.navigation.navigate(SCREEN_BALANCE);

    onChangeText = () => {}

    showInput = () => this.setState({showingInput: true})

    saveTask = async () => {
        // todo: add task to list
    }

    render() {
        const {showingInput} = this.state;

        return (
            <StepModule
                title="Tasks"
                icon="family"
                content={'Please choose a task from below list'}
                pad
                loading={this.state.loading}
                onBack={this.onBack}
            >
                <FlatList
                    data={
                        this.getTasksList()
                    }
                    renderItem={({item}) => <Text>{item.key}</Text>}
                />
                {showingInput ?
                    <View>
                        <TextInput
                            numberOfLines={1}
                            placeholder="New Task"
                            onChangeText={this.onChangeText}
                            returnKeyType="done"
                        />
                        <Button
                            label={'Save'}
                            onPress={this.saveTask}
                        />
                    </View>
                    :
                    <Button
                        label={'Add another'}
                        onPress={this.showInput}
                    />
                }
            </StepModule>
        );
    }
}

export default connect()(TasksList);
