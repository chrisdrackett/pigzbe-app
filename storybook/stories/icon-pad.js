import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {storiesOf} from '@storybook/react-native';
import IconPad from '../../src/app/components/icon-pad';
import Dots from '../../src/app/components/dots';

const length = 6;

class NumEntry extends Component {
    state = {
        input: ''
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.error && !this.props.error) {
            this.setState({input: ''});
            this.props.onInput('');
        }
    }

    onInput = input => this.setState({input})

    onFull = input => this.setState({input})

    render() {
        return (
            <View style={{backgroundColor: 'black', padding: 18, flex: 1}}>
                <View style={{alignItems: 'center'}}>
                    <Text style={{color: 'white'}}>{this.state.input}</Text>
                    <Dots length={length} progress={this.state.input.length}/>
                    <IconPad
                        onInput={this.onInput}
                        onFull={this.onFull}
                    />
                </View>
            </View>
        );
    }
}

storiesOf('ChildLogin')
    .add('icon pad', () => <NumEntry/>);
