import React, {Component} from 'react';
import {View} from 'react-native';

import {storiesOf} from '@storybook/react-native';
import SearchableList from '../../src/app/components/searchable-list';


const style = {
    flex: 1,
    backgroundColor: 'rgb(0, 50, 120)',
    padding: 40,
};

class SearchableListTest extends Component {
    state = {
        key: null
    }

    render() {
        const {error} = this.props;
        return (
            <View style={style}>
                <SearchableList 
                    selectedKey={this.state.key}
                    onChangeSelection={key => this.setState({key})}
                    items={{
                        AU: "Australia",
                        BE: "Belgium",
                        CN: "China",
                        DK: "Denmark",
                        EC: "Ecuador",
                        EG: "Egypt",
                        FR: "France",
                        GE: "Georgia",
                        DE: "Germany",
                        GR: "Greece",
                        HK: "Hong Kong",
                        IS: "Iceland",
                        IN: "India",
                        IT: "Italy",
                        JP: "Japan",
                        KR: "Korea, Republic Of",
                        MX: "Mexico",
                        FM: "Micronesia, Federated States Of",
                        RU: "Russian Federation",
                        ES: "Spain",
                        GB: "United Kingdom",
                        US: "United States",
                        ZW: "Zimbabwe",
                    }}
                />
            </View>
        );
    }
}

storiesOf('SearchableList')
    .add('default', () => (
        <SearchableListTest />
    ));
