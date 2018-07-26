import React from 'react';
import {storiesOf} from '@storybook/react-native';
import {Messages} from '../../src/app/screens/messages';

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

storiesOf('Messages')
    .add('default', () => (
        <Messages {...props}/>
    ));
