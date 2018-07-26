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
    qrCode: 'https://s3.amazonaws.com/qr-codes-9f266de4dd32a7244bf6862baea01379/A3-0S-XbnuBmBZyw5Coe1SDSSBYncvW1guTv1znoHkU.png',
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
