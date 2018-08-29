import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {TasksList} from '../../src/app/screens/tasks-list';

const props = {
    dispatch: () => {},
    navigation: {
        navigate: () => {},
        addListener: () => {},
        state: {
            key: 'SCREEN_TASKS',
            routeName: 'SCREEN_TASKS'
        },
        actions: {}
    },
};

storiesOf('Tasks')
    .add('list', () => (
        <TasksList {...props}/>
    ));
