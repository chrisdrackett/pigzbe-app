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

    onChangeAmount = amount => console.log('wollo amount set to: ', amount);

    render() {
        return (
            <View style={style}>
                <WolloInput
                    currency="GBP"
                    exchange={0.091956}
                    onChangeAmount={this.onChangeAmount}
                />
            </View>
        );
    }
}

storiesOf('Wollo Input')
    .add('default', () => (
        <WolloInputComponent />
    ));
