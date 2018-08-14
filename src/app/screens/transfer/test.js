import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import Transfer from './';
import wollo from '../../reducers/wollo';
import {mockStore} from '../../../setupTests';

const props = {
    dispatch: () => {},
    navigation: {
        navigate: () => {},
        addListener: () => {},
        state: {
            key: 'SCREEN_TRANSFER',
            routeName: 'SCREEN_TRANSFER'
        },
        actions: {}
    },
};

describe('Transfer', () => {
    test('renders correctly', () => {
        const tree = renderer.create((
            <Provider store={mockStore({wollo})}>
                <Transfer {...props}/>
            </Provider>
        )).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
