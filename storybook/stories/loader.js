import React from 'react';
import {storiesOf} from '@storybook/react-native';
import Loader from '../../src/app/components/loader';

const props = {
    isLoading: true,
    message: '',
    light: false,
};

storiesOf('Loader')
    .add('default', () => (
        <Loader {...props}/>
    ))
    .add('message', () => (
        <Loader {...{
            ...props,
            message: 'Loading message'
        }}/>
    ))
    .add('light', () => (
        <Loader {...{
            ...props,
            light: true,
        }}/>
    ))
    .add('light message', () => (
        <Loader {...{
            ...props,
            light: true,
            message: 'Loading message'
        }}/>
    ));
