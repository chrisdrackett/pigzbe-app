import {StyleSheet} from 'react-native';
import {color, fontFamily} from '../../styles';

export default StyleSheet.create({
    payment: {
        alignSelf: 'stretch',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 20,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: color.mediumGrey,
    },
    date: {
        fontFamily,
        color: color.blue,
        fontWeight: 'bold',
        fontSize: 14,
        marginBottom: 5
    },
    detail: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    },
    info: {
        marginRight: 10,
    },
    amountWrapper: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    amount: {
        fontFamily,
        color: color.darkGrey,
        fontSize: 16,
        lineHeight: 16,
    },
    direction: {
        width: 7,
        flexBasis: 7,
        flexGrow: 0,
        height: 15,
        marginLeft: 8,
    },
    address: {
        fontFamily,
        color: color.grey,
        fontSize: 12,
        width: 170,
    },
    memo: {
        fontFamily,
        color: color.grey,
        fontSize: 14
    },
});
