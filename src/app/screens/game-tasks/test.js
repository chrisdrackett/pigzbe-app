import React from 'react';
import renderer from 'react-test-renderer';
import GameTasks from './';

const props = {
    dispatch: () => {},
    navigation: {
        navigate: () => {},
        addListener: () => ({remove: () => {}}),
        state: {
            key: 'SCREEN_GAME',
            routeName: 'SCREEN_GAME'
        },
        actions: {}
    },
    kid: {
        name: 'Ella',
        dob: '01/01/2010',
        photo: '',
        balance: '20',
        tasks: [{
            task: 'Clean the car',
            reward: '10',
        }, {
            task: 'Do your homework',
            reward: '100',
        }]
    },
    parentNickname: 'Dad',
};

describe('Game tasks', () => {
    test('renders correctly', () => {
        renderer.create(
            <GameTasks {...props} />
        );
    });
});
