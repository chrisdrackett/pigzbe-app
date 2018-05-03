import {StyleSheet, Dimensions} from 'react-native';
import {
    container,
    color,
    fontFamily,
    paddingH
} from '../../styles';

export default StyleSheet.create({
    container,
    containerHeader: {
        height: 245,
        flexBasis: 245,
        flexGrow: 0,
        width: '100%',
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    containerBody: {
        flexGrow: 1,
        backgroundColor: color.lightGrey,
        alignSelf: 'stretch',
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    title: {
        fontFamily,
        color: color.white,
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10,
        textAlign: 'center'
    },
    transaction: {
        flex: 1,
        width: Dimensions.get('window').width,
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
    border: {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        height: 5,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1
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
