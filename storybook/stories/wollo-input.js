import React from 'react';
import {View} from 'react-native';
import {storiesOf} from '@storybook/react-native';
import WolloInput from '../../src/app/components/wollo-input';

const style = {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 40,
};

const props = {
    currency: 'GBP',
    setAmount: (amount) => {
        console.log(`amount set to: ${amount}`);
    }
};

storiesOf('Wollo Input')
    .add('default', () => (
        <View style={style}>
            <WolloInput {...props}/>
        </View>
    ));
