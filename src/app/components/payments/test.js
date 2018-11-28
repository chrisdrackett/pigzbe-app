import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import Payments from './';
import wallet from '../../reducers/wallet';
import keys from '../../reducers/keys';
import kids from '../../reducers/kids';
import {mockStore} from '../../../setupTests';

const props = {
    dispatch: () => {},
    payments: [],
};

describe('Payments', () => {
    test('renders correctly', () => {
        renderer.create((
            <Provider store={mockStore({wallet, keys, kids})}>
                <Payments {...props}/>
            </Provider>
        ));
    });
});
