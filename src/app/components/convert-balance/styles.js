import {StyleSheet} from 'react-native';
import {
    color,
    fontFamily
} from '../../styles';

export default StyleSheet.create({
    container: {
        backgroundColor: color.lightGrey,
        // alignSelf: 'stretch',
        // flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 20
    },
    containerCoins: {
        // flexGrow: 0,
        // flex: 1,
        flexDirection: 'row',
        marginTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexWrap: 'wrap'
    },
    title: {
        fontFamily,
        fontSize: 14,
        color: color.darkGrey,
        marginTop: 20,
    },
    label: {
        fontFamily,
        fontSize: 12,
        color: color.darkGrey
    },
});
