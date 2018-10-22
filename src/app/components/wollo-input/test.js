import React from 'react';
import renderer from 'react-test-renderer';
import WolloInput from './';
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
    })
}));

const props = {
    onChangeAmount: () => {}
};

describe('WolloInput', () => {
    test('renders correctly', () => {
        renderer.create(
            <Provider store={store}>
                <WolloInput {...props}/>
            </Provider>
        );
    });
});
