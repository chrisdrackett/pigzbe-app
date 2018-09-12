import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {TasksList} from '../../src/app/screens/tasks-list';

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
};

storiesOf('Tasks')
    .add('list', () => (
        <TasksList {...props}/>
    ));
