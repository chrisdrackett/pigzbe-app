import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {Allowance} from '../../src/app/screens/allowance';

const props = {
    dispatch: () => {},
    navigation: {
        navigate: () => {},
        addListener: () => {},
        state: {
            key: 'SCREEN_ALLOWANCE',
            routeName: 'SCREEN_ALLOWANCE'
        },
        actions: {}
    },
    allowances: [25, 50, 75, 100, 125, 150],
};

storiesOf('Allowance')
    .add('allowance', () => (
        <Allowance {...props}/>
    ));
