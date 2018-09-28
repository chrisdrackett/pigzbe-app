import React, {Component} from 'react';
import {storiesOf} from '@storybook/react-native';
import {View, Dimensions} from 'react-native';
import Tree from '../../src/app/components/game-tree';

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

class TreeWithAddedLeaf extends Component {
    state = {
        value: 50,
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                value: 100,
            });
        }, 5000);
    }

    render() {
        return (<View
            style={flexStyle}
        >
            <Tree
                value={this.state.value}
                name="LARGE Tree"
            />
        </View>);
    }
}

storiesOf('Game')
    .add('tree with added leaf', () => (
        <TreeWithAddedLeaf />
    ));
