import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {TouchId} from '../../src/app/screens/touch-id';

const props = {
    dispatch: () => {},
    navigation: {
        navigate: () => {},
        state: {
            key: 'SCREEN_TOUCH_ID',
            routeName: 'SCREEN_TOUCH_ID'
        },
        actions: {}
    },
};

storiesOf('Touch Id')
    .add('default', () => (
        <TouchId {...props}/>
    ));
