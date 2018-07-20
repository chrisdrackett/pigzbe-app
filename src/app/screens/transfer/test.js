import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import Transfer from './';
import wollo from '../../reducers/wollo';
import {mockStore} from '../../../setupTests';

const props = {
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
