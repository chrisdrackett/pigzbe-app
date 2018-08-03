import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {HomeView} from '../../src/app/screens/home';

const props = {
    onLogin: () => {},
    onCreate: () => {},
    navigation: {
        navigate: () => {},
        addListener: () => ({remove: () => {}}),
        state: {
            key: 'SCREEN_HOME',
            routeName: 'SCREEN_HOME'
        },
        actions: {}
    },
};

storiesOf('Home')
    .add('default', () => (
        <HomeView {...props}/>
    ));
