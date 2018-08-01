import {StyleSheet} from 'react-native';
import {
    color,
    fontFamily,
    paddingH
} from '../../styles';

export default StyleSheet.create({
    transaction: {
        flex: 1,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 20,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: color.mediumGrey
    },
    inner: {
        alignSelf: 'stretch',
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },
    button: {
        backgroundColor: color.white,
        height: 95,
        flexBasis: 95,
        flexGrow: 0,
        paddingLeft: paddingH,
        paddingRight: paddingH,
        paddingTop: 20,
        paddingBottom: 10,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch',
    },
    detail: {
    },
    date: {
        fontFamily,
        color: color.blue,
        fontWeight: 'bold',
        fontSize: 14,
        marginBottom: 2
    },
    amount: {
        fontFamily,
        color: color.darkGrey,
        fontSize: 20
    },
    disabled: {
        backgroundColor: color.grey,
        borderColor: color.grey
    },
    claimed: {
        backgroundColor: color.green,
        borderColor: color.green,
    },
    claimedText: {
        color: color.white,
    },
    disabledText: {
        color: color.whiteOpacity60,
    },
    btn: {
        width: 100,
        flexBasis: 100
    },
});
