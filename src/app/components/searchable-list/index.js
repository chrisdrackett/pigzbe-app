import React, {Component} from 'react';
import {
    View,
    FlatList,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
} from 'react-native';
import styles from './styles';

export default class SearchableList extends Component {
    state = {
        searchText: '',
    }

    onSearchChange = (searchText) => {
        this.setState({
            searchText,
        });
    }

    getFilteredItems() {
        const {items, selectedKey} = this.props;
        const searchText = this.state.searchText.toLowerCase();

        const filteredKeys = Object.keys(items).filter(key => !searchText || items[key].toLowerCase().includes(searchText));

        return filteredKeys.map((key, i) => ({
            label: items[key],
            key: key,
            last: filteredKeys.length - 1 === i,
            selected: selectedKey === key,
        }));
    }

    render() {
        const items = this.getFilteredItems();

        return (
            <View style={styles.container}>
                <View style={styles.search}>
                    <View style={styles.searchBar}>
                        <Image source={require('./images/search.png')}/>
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search"
                            value={this.state.searchText}
                            onChangeText={this.onSearchChange}
                        />
                    </View>
                </View>
                <View style={styles.items}>
                    {items.length > 0 &&
                        <FlatList
                            data={items}
                            renderItem={this.renderItem}
                        />
                    }
                    {items.length === 0 && !!this.state.searchText &&
                        <View style={styles.lastItem}>
                            <Text style={styles.label}>No matches found</Text>
                        </View>
                    }
                </View>
            </View>
        );
    }

    renderItem = ({ item }) => {
        const {onChangeSelection} = this.props;

        return (
            <View style={item.last ? styles.lastItem : styles.item}>
                <TouchableOpacity style={styles.itemInner} onPress={() => onChangeSelection(item.key)}>
                    <Text style={styles.label}>{item.label}</Text>
                    {item.selected &&
                        <Image style={styles.tick} source={require('./images/tick.png')}/>
                    }
                </TouchableOpacity>
            </View>
        )
    }
}
