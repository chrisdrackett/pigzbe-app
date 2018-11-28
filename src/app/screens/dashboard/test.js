import React from 'react';
import renderer from 'react-test-renderer';
import {Dashboard} from './';
import {Provider} from 'react-redux';
import {createStore, combineReducers} from 'redux';
const store = createStore(combineReducers({
    app: () => ({
        isConnected: true,
    }),
    config: () => ({
        network: 'mainnet'
    }),
    keys: () => ({
        publicKey: ''
    }),
    settings: () => ({
        baseCurrency: 'GBP'
    }),
    wallet: () => ({
        selectedToken: 'WLO',
        balances: {
            WLO: '0',
            XLM: '0',
        }
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
    })
}));

const props = {
    dispatch: () => {},
    navigation: {
        navigate: () => {},
        addListener: () => {},
        state: {
            key: 'SCREEN_DASHBOARD',
            routeName: 'SCREEN_DASHBOARD'
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
    baseCurrency: 'GBP',
    balances: {XLM: '0', WLO: '0'},
    escrow: null,
    firstTime: true,
    kids: [],
};

describe('Dashboard', () => {
    test('renders correctly', () => {
        renderer.create(
            <Provider store={store}>
                <Dashboard {...props}/>
            </Provider>
        );
    });
});
