import React, {Component} from 'react';
import {storiesOf} from '@storybook/react-native';
import {View, Dimensions} from 'react-native';
import CloudFlow from '../../src/app/components/game-cloud-flow';

const flexStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 20,
    height: Dimensions.get('window').height,
    backgroundColor: 'rgba(106, 50, 16, 0.2)',
};

class CloudFlowComponent extends Component {
    state = {
        value: 50,
        status: 'bubble',
        clouds: [
            {
                type: 'ALLOWANCE',
                value: 30,
            },
            {
                type: 'TASK',
                value: 40,
                name: 'Wash the dishes',
            },
            {
                type: 'TASK',
                value: 20,
                name: 'Clean room',
            },
            {
                type: 'ALLOWANCE',
                value: 10,
            }
        ]
    }

    changeStatus = (status) => {
        console.log('>>> CHANGE STATUS: ', status);
        this.setState({status});
    }

    render() {
        return (<View
            style={flexStyle}
        >
            <CloudFlow
                clouds={this.state.clouds}
                type="TASK"
                name="do homework"
                changeStatus={this.changeStatus}
                status={this.state.status}
                value={10}
            />
        </View>);
    }
}

storiesOf('Game')
    .add('cloud flow', () => (
        <CloudFlowComponent />
    ));
