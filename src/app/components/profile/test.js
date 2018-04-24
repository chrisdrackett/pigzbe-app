import React from 'react';
import renderer from 'react-test-renderer';
import {ProfileComponent} from './';

const props = {
    dispatch: () => {},
    name: 'Name',
    email: 'mail@example.com',
    image: null,
    subscribe: true,
    hasProfile: true
};

describe('Profile', () => {
    test('renders correctly with profile', () => {
        const tree = renderer.create(<ProfileComponent {...props}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('renders correctly without profile', () => {
        const tree = renderer.create(
            <ProfileComponent {...Object.assign({}, props, {
                name: null,
                email: null,
                hasProfile: false
            })}/>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
