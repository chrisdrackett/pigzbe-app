import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {TasksList} from '../../src/app/screens/tasks-list';
import {Provider} from 'react-redux';
import {createStore, combineReducers} from 'redux';
import {TasksAssign} from '../../src/app/screens/tasks-assign';

const kid = {
    name: 'Ella',
    dob: '01/01/2010',
    photo: null,
    address: 'GD5Q7KRFQC3Q7YQPYAZ4G65B65EBCJOVSHPE65MIYQMCLUQULQDKBLUX',
    balance: '20',
};

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
    dispatch: () => {},
    navigation: {
        navigate: () => {},
        addListener: () => {},
        state: {
            key: 'SCREEN_TASKS_LIST',
            routeName: 'SCREEN_TASKS_LIST'
        },
        actions: {}
    },
    tasks: ['task one', 'task two'],
    defaultTasks: [
        'Clean the car',
        'Tidy your room',
        'Do your homework',
        'Take out the rubbish',
        'Wash the dishes'
    ],
    kid
};

storiesOf('Tasks')
    .addDecorator(story => <Provider store={store}>{story()}</Provider>)
    .add('list', () => (
        <TasksList {...props}/>
    ))
    .add('assign', () => (
        <TasksAssign {...props}/>
    ));
