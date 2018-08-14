import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {Family} from '../../src/app/screens/family';

const props = {
    dispatch: () => {},
    navigation: {
        navigate: () => {},
        addListener: () => {},
        state: {
            key: 'SCREEN_BALANCE',
            routeName: 'SCREEN_BALANCE'
        },
        actions: {}
    },
};

storiesOf('Family')
    .add('default', () => (
        <Family {...props}/>
    ));
