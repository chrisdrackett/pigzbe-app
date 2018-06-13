import './global';
import React from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import Root from './navigation/root';

if (typeof console !== 'undefined') {
    console.disableYellowBox = true;
}

export const store = createStore(
    reducers,
    applyMiddleware(thunk),
);

export default () => (
    <Provider store={store}>
        <Root/>
    </Provider>
);
