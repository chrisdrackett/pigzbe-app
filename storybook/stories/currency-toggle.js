import React from 'react';
import {View} from 'react-native';
import {storiesOf} from '@storybook/react-native';
import CurrencyToggle from '../../src/app/components/currency-toggle';

const style = {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
    padding: 40,
};

const props = {
    currency: {
        name: 'GBP',
        short: '£',
    },
    currencyChange: currency => {
        console.log(`currency changed to: ${currency}`);
    }
};

storiesOf('Wollo Input')
    .add('currency toggle', () => (
        <View style={style}>
            <CurrencyToggle {...props}/>
        </View>
    ));
