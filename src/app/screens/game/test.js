import React from 'react';
import renderer from 'react-test-renderer';
import {Game} from './';
import {Provider} from 'react-redux';
import wollo from '../../reducers/wollo';
import keys from '../../reducers/keys';
import kids from '../../reducers/kids';
import settings from '../../reducers/settings';
import exchange from '../../reducers/exchange';
import {mockStore} from '../../../setupTests';

const props = {
    dispatch: () => {},
    navigation: {
        navigate: () => {},
        addListener: () => ({remove: () => {}}),
        state: {
            key: 'SCREEN_GAME',
            routeName: 'SCREEN_GAME'
        },
        actions: {}
    },
    exchange: {
        XLM: 0.3936,
        BTC: 0.0000147,
        ETH: 0.00025584,
        EUR: 0.102828,
        USD: 0.12,
        JPY: 13.8984,
        GBP: 0.091956,
        GOLD: 0.0031452
    },
    wolloCollected: 10,
    overlayOpen: false,
    kid: {
        name: 'Ella',
        dob: '01/01/2010',
        photo: '',
        balance: '20',
        tasks: [{
            task: 'Clean the car',
            reward: '10',
        }, {
            task: 'Do your homework',
            reward: '100',
        }],
        goals: []
    },
    parentNickname: 'Dad',
};

describe('Game', () => {
    test('renders correctly', () => {
        renderer.create(
            <Provider store={mockStore({wollo, keys, kids, settings, exchange})}>
                <Game {...props} />
            </Provider>
        );
    });
});
