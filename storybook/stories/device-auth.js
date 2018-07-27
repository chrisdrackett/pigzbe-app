import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {DeviceAuth} from '../../src/app/screens/device-auth';

const props = {
    dispatch: () => {},
    navigation: {
        navigate: () => {},
        state: {
            key: 'DEVICE_AUTH',
            routeName: 'DEVICE_AUTH'
        },
        actions: {}
    },
    online: true,
    id: null,
    qrCode: null,
    error: null,
    isLoading: false,
    requested: false,
    verified: false,
    failCount: 0,
};

storiesOf('Device Auth')
    .add('default', () => (
        <DeviceAuth {...props}/>
    ))
    .add('registered', () => (
        <DeviceAuth {...{
            ...props,
            id: '123'
        }}/>
    ));
