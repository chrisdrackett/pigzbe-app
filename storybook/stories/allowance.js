import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {AllowanceAmount} from '../../src/app/screens/allowance-amount';
import {AllowanceInterval} from '../../src/app/screens/allowance-interval';

const props = {
    dispatch: () => {},
    navigation: {
        navigate: () => {},
        addListener: () => {},
        state: {
            key: 'SCREEN_ALLOWANCE_AMOUNT',
            routeName: 'SCREEN_ALLOWANCE_AMOUNT'
        },
        actions: {},
    },
    baseCurrency: 'GBP',
};

storiesOf('Allowance')
    .add('amount', () => (
        <AllowanceAmount {...props}/>
    ))
    .add('interval', () => (
        <AllowanceInterval {...props}/>
    ));
