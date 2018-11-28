import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {Settings} from '../../src/app/screens/settings';
import {kids} from './dashboard';
import {Provider} from 'react-redux';
import {createStore, combineReducers} from 'redux';

const store = createStore(combineReducers({
    settings: () => ({
        baseCurrency: 'GBP'
    }),
    exchange: () => ({
        exchange: {
            XLM: 0.3936,
            BTC: 0.0000147,
            ETH: 0.00025584,
            EUR: 0.102828,
            USD: 0.12,
            JPY: 13.8984,
            GBP: 0.091956,
            GOLD: 0.0031452
        }
    }),
    wallet: () => ({
        balance: '0'
    }),
    kids: () => ({
        sendError: null
    })
}));

const props = {
    dispatch: () => {},
    navigation: {
        navigate: () => {},
        state: {
            key: 'SCREEN_SETTINGS',
            routeName: 'SCREEN_SETTINGS'
        },
        actions: {}
    },
    touchIdSupport: 'TouchID',
    enableTouchId: true,
    subscribe: true,
    email: 'name@pigzbe.com',
    phone: '7908444555',
    country: '44',
    kids: [],
};

storiesOf('Settings')
    .addDecorator(story => <Provider store={store}>{story()}</Provider>)
    .add('default', () => (
        <Settings {...props}/>
    ))
    .add('no TouchID support', () => (
        <Settings {...{
            ...props,
            touchIdSupport: false,
        }}/>
    ))
    .add('FaceID support', () => (
        <Settings {...{
            ...props,
            touchIdSupport: 'FaceID',
        }}/>
    ))
    .add('with kids', () => (
        <Settings {...{
            ...props,
            kids
        }}/>
    ));
