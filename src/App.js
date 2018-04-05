import React from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import Nav from './nav';

const store = createStore(
    reducers,
    applyMiddleware(thunk),
);

export default () => (
    <Provider store={store}>
        <Nav/>
    </Provider>
);
