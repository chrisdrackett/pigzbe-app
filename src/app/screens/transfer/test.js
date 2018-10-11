import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import {Transfer} from './';
import wollo from '../../reducers/wollo';
import keys from '../../reducers/keys';
import {mockStore} from '../../../setupTests';

const props = {
    dispatch: () => {},
    navigation: {
        navigate: () => {},
        addListener: () => {},
        state: {
            key: 'SCREEN_TRANSFER',
            routeName: 'SCREEN_TRANSFER'
        },
        actions: {}
    },
    error: null,
    balance: '0',
    balanceXLM: '0',
    minXLM: '0',
    hasGas: false,
    publicKey: 'GD5Q7KRFQC3Q7YQPYAZ4G65B65EBCJOVSHPE65MIYQMCLUQULQDKBLUX',
};

describe('Transfer', () => {
    test('renders correctly', () => {
        renderer.create(
            <Provider store={mockStore({wollo, keys})}>
                <Transfer {...props}/>
            </Provider>
        );
    });
});
