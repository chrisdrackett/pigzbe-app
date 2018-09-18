import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {HomeView} from '../../src/app/screens/home';
import {kids} from './dashboard';

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
            showKidLogin: true,
            kids,
        }}/>
    ))
    .add('with 1 kid', () => (
        <HomeView {...{
            ...props,
            showKidLogin: true,
            kids: kids.slice(0, 1),
        }}/>
    ))
    .add('with 3 kids', () => (
        <HomeView {...{
            ...props,
            showKidLogin: true,
            kids: kids.concat(kids.slice(0, 1)),
        }}/>
    ))
    .add('with 8 kids', () => (
        <HomeView {...{
            ...props,
            showKidLogin: true,
            kids: kids.concat(kids.slice(0), kids.slice(0), kids.slice(0)),
        }}/>
    ));
