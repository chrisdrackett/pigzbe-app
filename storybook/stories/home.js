import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {HomeView, HomeErrorView} from '../../src/app/screens/home';

const props = {
    onCreate: () => {},
    onLogin: () => {},
    onInit: () => {},
};

storiesOf('Home')
    .add('default', () => (
        <HomeView {...props}/>
    ))
    .add('failed', () => (
        <HomeErrorView {...props}/>
    ));
