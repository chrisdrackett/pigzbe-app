import {StyleSheet} from 'react-native';
import {
    color,
    fontFamily
} from '../../styles';

export default StyleSheet.create({
    container: {
        backgroundColor: color.lightGrey,
        overflow: 'visible',
        alignSelf: 'stretch',
        flex: 1,
        boxSizing: 'content-box',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 20,
        paddingBottom: 20,
    },
    containerCoins: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        marginTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
        justifyContent: 'space-between',
        flexWrap: 'wrap',
    },
    title: {
        fontFamily,
        fontSize: 14,
        color: color.darkPurple
    },
    label: {
        fontFamily,
        fontSize: 12,
        color: color.darkPurple
    }
});
