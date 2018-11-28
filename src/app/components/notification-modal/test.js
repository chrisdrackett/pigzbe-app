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
        renderer.create(<NotificationModal {...props} />);
    });
    test('renders correctly with no button', () => {
        renderer.create(<NotificationModal {...props} type="warning" hideButton />);
    });
    test('renders correctly with custom title and btn label', () => {
        renderer.create(<NotificationModal {...props} type="error" title="Chaos" buttonLabel="Accept" />);
    });
});
