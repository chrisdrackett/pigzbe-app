import React from 'react';
import renderer from 'react-test-renderer';
import Loader from './';

const props = {
    loading: true,
    message: ''
};

describe('Loader', () => {
    test('renders correctly when loading', () => {
        const tree = renderer.create(
            <Loader {...props}/>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    test('renders correctly when not loading', () => {
        const tree = renderer.create(
            <Loader {...Object.assign({}, props, {
                loading: false
            })}/>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
