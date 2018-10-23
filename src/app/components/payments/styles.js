import {StyleSheet} from 'react-native';
import {color, fontFamily} from '../../styles';

export default StyleSheet.create({
    payment: {
        marginLeft: 20,
        marginRight: 20,
        paddingTop: 20,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: color.mediumGrey,
    },
    date: {
        fontFamily,
        color: color.lighterBlue,
        fontWeight: 'bold',
        fontSize: 12,
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
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    amount: {
        fontFamily,
        color: color.blue,
        fontSize: 12,
        lineHeight: 18,
        fontWeight: 'bold',
    },
    direction: {
        height: 11,
        marginRight: 6,
        marginBottom: 3,
    },
    address: {
        fontFamily,
        color: color.grey,
        fontSize: 10,
    },
    memo: {
        fontFamily,
        color: color.blue,
        fontWeight: 'bold',
        fontSize: 12
    },
    buttons: {
        flexDirection: 'row',
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: 20,
        borderBottomWidth: 1,
        borderBottomColor: color.mediumGrey,
    },
    toggle: {
        flex: 1,
    },
    button: {
        borderRadius: 4,
    },
    buttonInactive: {
        borderWidth: 0,
    },
    noHistory: {
        marginTop: 30,
    },
    help: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    helpText: {
        fontFamily,
        color: color.lighterBlue,
        fontWeight: 'bold',
        fontSize: 14,
        maxWidth: '60%',
        textAlign: 'center',
    },
    helpButton: {
        marginTop: 20,
        maxWidth: 180,
    }
});
