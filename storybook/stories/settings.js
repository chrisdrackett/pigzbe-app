import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {Settings} from '../../src/app/screens/settings';

const props = {
    dispatch: () => {},
    navigation: {
        navigate: () => {},
        state: {
            key: 'SCREEN_SETTINGS',
            routeName: 'SCREEN_SETTINGS'
        },
        actions: {}
    },
    enableTouchId: true,
    subscribe: true,
    email: 'name@pigzbe.com',
    phone: '7908444555',
    country: '44',
};

storiesOf('Settings')
    .add('default', () => (
        <Settings {...props}/>
    ));
