import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {HomeView} from '../../src/app/screens/home';
import {kids} from './balance';

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
    ))
    .add('with kids', () => (
        <HomeView {...{
            ...props,
            hasKids: true,
            kids,
        }}/>
    ))
    .add('with 1 kid', () => (
        <HomeView {...{
            ...props,
            hasKids: true,
            kids: kids.slice(0, 1),
        }}/>
    ))
    .add('with 3 kids', () => (
        <HomeView {...{
            ...props,
            hasKids: true,
            kids: kids.concat(kids.slice(0, 1)),
        }}/>
    ));
