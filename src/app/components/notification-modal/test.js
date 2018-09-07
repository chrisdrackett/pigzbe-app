import React from 'react';
import renderer from 'react-test-renderer';
import NotificationModal from './';

const props = {
    open: true,
    type: 'success',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.',
    onRequestClose: () => {},
};

describe('NotificationModal', () => {
    test('renders correctly', () => {
        const tree = renderer.create(<NotificationModal {...props} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
    test('renders correctly with no button', () => {
        const tree = renderer.create(<NotificationModal {...props} type="warning" hideButton />).toJSON();
        expect(tree).toMatchSnapshot();
    });
    test('renders correctly with custom title and btn label', () => {
        const tree = renderer.create(<NotificationModal {...props} type="error" title="Chaos" buttonLabel="Accept" />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
