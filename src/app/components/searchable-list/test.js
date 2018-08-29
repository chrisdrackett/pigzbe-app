import React from 'react';
import renderer from 'react-test-renderer';
import SearchableList from './';

const props = {
    selectedKey: 'GB',
    onChangeSelection: () => {},
    items: {
        BE: "Belgium",
        DK: "Denmark",
        FR: "France",
        DE: "Germany",
        IT: "Italy",
        JP: "Japan",
        ES: "Spain",
        GB: "United Kingdom",
    }
};

describe('SearchableList', () => {
    test('renders correctly', () => {
        const tree = renderer.create(<SearchableList {...props}/>).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
