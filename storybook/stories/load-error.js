import React from 'react';
import {storiesOf} from '@storybook/react-native';
import LoadError from '../../src/app/screens/load-error';

const props = {
    dispatch: () => {},
    navigation: {
        navigate: () => {},
        state: {
            key: 'SCREEN_LOAD_ERROR',
            routeName: 'SCREEN_LOAD_ERROR'
        },
        actions: {}
    },
};

storiesOf('Load Error')
    .add('default', () => (
        <LoadError {...props}/>
    ));
