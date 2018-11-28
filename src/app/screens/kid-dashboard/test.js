import React from 'react';
import renderer from 'react-test-renderer';
import {KidDashboard} from './';
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
    wollo: () => ({
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
        addListener: () => {},
        state: {
            key: 'SCREEN_KID_DASHBOARD',
            routeName: 'SCREEN_KID_DASHBOARD'
        },
        actions: {}
    },
    error: null,
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
    balances: {XLM: '0', WLO: '0'},
    baseCurrency: 'USD',
    escrow: null,
    firstTime: true,
    kid: {
        name: 'Ella',
        dob: '01/01/2010',
        photo: '',
        address: 'GD5Q7KRFQC3Q7YQPYAZ4G65B65EBCJOVSHPE65MIYQMCLUQULQDKBLUX',
        balance: '20',
        tasks: [],
        allowances: [],
        goals: [],
    }
};

describe('Kid dashboard', () => {
    test('renders correctly', () => {
        renderer.create(
            <Provider store={store}>
                <KidDashboard {...props}/>
            </Provider>
        );
    });
});
