import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {storiesOf} from '@storybook/react-native';
import NumPad from '../../src/app/components/num-pad';
import Dots from '../../src/app/components/dots';

const length = 6;

class NumEntry extends Component {
    state = {
        input: ''
    }

    onInput = input => this.setState({input})

    onFull = input => this.setState({input})

    render() {
        return (
            <View style={{backgroundColor: 'black', padding: 18, flex: 1}}>
                <View style={{alignItems: 'center'}}>
                    <Text style={{color: 'white'}}>{this.state.input}</Text>
                    <Dots length={length} progress={this.state.input.length}/>
                    <NumPad
                        length={length}
                        onInput={this.onInput}
                        onFull={this.onFull}
                    />
                </View>
            </View>
        );
    }
}

storiesOf('NumPad')
    .add('default view', () => <NumEntry/>);
