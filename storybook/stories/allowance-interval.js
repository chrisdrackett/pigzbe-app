import React from 'react';
import {storiesOf} from '@storybook/react-native';
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
        actions: {}
    },
    intervals: ['Daily', 'Weekly', 'Fortnightly', 'Monthly'],
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
};

storiesOf('Allowance')
    .add('interval', () => (
        <AllowanceInterval {...props}/>
    ));
