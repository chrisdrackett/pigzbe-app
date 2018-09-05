import React, {Component} from 'react';
import {View} from 'react-native';
import {storiesOf} from '@storybook/react-native';
import WolloInput from '../../src/app/components/wollo-input';

const style = {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 40,
};

class WolloInputComponent extends Component {
    state = {
        input: ''
    }

    setAmount = amount => console.log('amount set to: ', amount)

    render() {
        return (
            <View style={style}>
                <WolloInput
                    currency="GBP"
                    onChangeAmount={this.onChangeAmount}/>
            </View>
        );
    }
}

storiesOf('Wollo Input')
    .add('default', () => (
        <WolloInputComponent />
    ));
