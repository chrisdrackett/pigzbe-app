import React from 'react';
import renderer from 'react-test-renderer';
import ActionSheet from './';

describe('ActionSheet', () => {
    test('renders correctly', () => {
        const tree = renderer.create(
            <ActionSheet
                open={true}
                options={[
                    'Passport',
                    'Driver\'s Licence',
                    'National ID card'
                ]}
                title="Select a document"
                onRequestClose={() => {}}
            />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
