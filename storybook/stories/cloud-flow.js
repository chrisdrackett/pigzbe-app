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

    // reduceValue = () => {
    //     console.log('reduceValue', this.state.value);
    //
    //     this.setState({
    //         value: this.state.value - 1,
    //     });
    // }

    render() {
        return (<View
            style={flexStyle}
        >
            <CloudFlow
                value={this.state.value}
                type="ALLOWANCE"
                callback={this.reduceValue}
            />
        </View>);
    }
}

storiesOf('Game')
    .add('cloud flow', () => (
        <CloudFlowComponent />
    ));
