import React, {Component} from 'react';
import {storiesOf} from '@storybook/react-native';
import {View, Dimensions} from 'react-native';
import Cloud from '../../src/app/components/cloud';

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

class CloudComponent extends Component {
    state = {
        value: 50,
    }

    reduceValue = () => {
        console.log('reduceValue', this.state.value);

        this.setState({
            value: this.state.value - 1,
        });
    }

    render() {
        return (<View
            style={flexStyle}
        >
            <Cloud
                value={this.state.value}
                type="ALLOWANCE"
                callback={this.reduceValue}
            />
        </View>);
    }
}

storiesOf('Game')
    .add('cloud', () => (
        <CloudComponent />
    ));
