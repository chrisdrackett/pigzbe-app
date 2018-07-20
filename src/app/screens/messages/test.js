import React from 'react';
import renderer from 'react-test-renderer';
import {MessagesComponent} from './';

const props = {
    dispatch: () => {},
    messages: [{
        key: '1',
        date: '2018-04-20T12:00+01:00',
        text: 'Morbi in sem quis dui placerat ornare. Pellentesque odio nisi, euismod in, pharetra a, ultricies in, diam. Sed arcu. Cras consequat.',
        link: 'https://pigzbe.com'
    }, {
        key: '2',
        date: '2018-04-20T09:00+01:00',
        text: 'Phasellus ultrices nulla quis nibh. Quisque a lectus. Donec consectetuer ligula vulputate sem tristique cursus. Nam nulla quam, gravida non, commodo a, sodales sit amet, nisi.'
    }],
    loading: false,
    error: null
};

describe('Messages', () => {
    // test('renders correctly with messages', () => {
    //     const tree = renderer.create(<MessagesComponent {...props}/>).toJSON();
    //     expect(tree).toMatchSnapshot();
    // });

    test('renders correctly without messages', () => {
        const tree = renderer.create(
            <MessagesComponent {...Object.assign({}, props, {
                messages: []
            })}/>
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
