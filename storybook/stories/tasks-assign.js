import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {TasksAssign} from '../../src/app/screens/tasks-assign';

const props = {
    dispatch: () => {},
    navigation: {
        navigate: () => {},
        addListener: () => {},
        state: {
            key: 'SCREEN_TASKS_ASSIGN',
            routeName: 'SCREEN_TASKS_ASSIGN',
            params: {
                kid: 'Ella',
            }
        },
        actions: {},
    },
};

storiesOf('Tasks')
    .add('assign', () => (
        <TasksAssign {...props}/>
    ));
