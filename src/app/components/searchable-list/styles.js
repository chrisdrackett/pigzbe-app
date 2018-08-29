import {StyleSheet} from 'react-native';

import {
    color,
    fontFamily
} from '../../styles';

export default StyleSheet.create({
    container: {
        backgroundColor: color.white,
    },
    search: {
        height: 75,
        justifyContent: 'center',
        borderBottomColor: color.lighterBlue,
        borderBottomWidth: 1,
    },
    searchBar: {
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: color.lightSkyBlue,
        height: 36,
        alignItems: 'center',
        borderRadius: 4,
        paddingLeft: 10,
        flexDirection: 'row',
    },
    searchInput: {
        marginLeft: 7,
        fontFamily,
        flex: 1,
        fontSize: 14,
    },
    items: {
        paddingLeft: 20,
        paddingRight: 20,
    },
    item: {
        height: 49,
        justifyContent: 'center',
        borderBottomColor: color.lighterBlue,
        borderBottomWidth: 1,
    },
    itemInner: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    lastItem: {
        borderBottomWidth: 0,
    },
    label: {
        fontFamily,
        color: color.blue,
        fontSize: 14,
        fontWeight: 'bold',
    },
    tick: {
        marginRight: 15,
    },
    noResults: {
        height: 49,
        justifyContent: 'center',
    },
});
