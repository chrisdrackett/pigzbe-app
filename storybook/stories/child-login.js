import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {ChildLogin} from '../../src/app/screens/child-login';

const props = {
    dispatch: () => {},
    navigation: {
        navigate: () => {},
        state: {
            key: 'SCREEN_CHILD_LOGIN',
            routeName: 'SCREEN_CHILD_LOGIN'
        },
        actions: {}
    },
};

storiesOf('ChildLogin')
    .add('create', () => (
        <ChildLogin {...props}/>
    ));
