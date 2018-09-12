import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {Allowance} from '../../src/app/screens/allowance';

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
    currency: 'GBP',
};

storiesOf('Allowance')
    .add('allowance', () => (
        <Allowance {...props}/>
    ));
