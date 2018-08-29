import React, {Component} from 'react';
import {connect} from 'react-redux';
import Button from '../../components/button';
import {SCREEN_BALANCE} from '../../constants';
import StepModule from '../../components/step-module';
// import {familyAddKid} from '../../actions';

export class TaskList extends Component {
    state = {
        loading: false,
        tasks: ['wash dishes', 'clean room', 'do your homework'],
    }

    onBack = () => this.props.navigation.navigate(SCREEN_BALANCE)

    addTask = async () => {
        // todo: add task to list
    }

    render() {
        return (
            <StepModule
                title="Tasks"
                icon="family"
                content={'Please choose a task from below list'}
                pad
                loading={this.state.loading}
                onBack={this.onBack}
            >
                <Button
                    label={'Add another'}
                    onPress={this.addTask}
                />
            </StepModule>
        );
    }
}

export default connect()(TaskList);
