import './global';
import React from 'react';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import BackgroundTask from 'react-native-background-task';
import reducers from './reducers';
import Root from './navigation/root';
import {getKeys} from 'app/actions';
import {handleAllowances} from 'app/utils/allowances'

if (typeof console !== 'undefined') {
    console.disableYellowBox = true;
}

export const store = createStore(
    reducers,
    applyMiddleware(thunk),
);

// Check on boot
setTimeout(async () => {
    await handleAllowances(store);
}, 1000);

BackgroundTask.define(async () => {
    // Finish when the task finishes, or after 25 seconds
    let finished = false;
    setTimeout(() => {
        if (!finished) {
            BackgroundTask.finish();
        }
    }, 25000);

    await handleAllowances(store);
    finished = true;
    BackgroundTask.finish();
})

export default () => (
    <Provider store={store}>
        <Root/>
    </Provider>
);
