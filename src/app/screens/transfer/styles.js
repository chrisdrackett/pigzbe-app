import {StyleSheet} from 'react-native';
import {color, fontFamily} from '../../styles';

export default StyleSheet.create({
    containerForm: {
        width: '100%',
    },
    wollo: {
        position: 'absolute',
        bottom: 21,
        left: 11,
        width: 23,
        height: 23,
    },
    amountInput: {
        paddingLeft: 42,
    },
    buttonWrapper: {
        marginTop: 20,
    },
    sending: {
        backgroundColor: color.blueOpacity80,
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    sendingText: {
        fontFamily,
        color: color.white,
        fontSize: 14,
    },
    edit: {
        position: 'absolute',
        top: 0,
        right: 0,
    },
    editBtn: {
        alignSelf: 'auto',
        marginBottom: 0,
    },
    editText: {
        paddingRight: 5,
        paddingTop: 8,
        paddingBottom: 8,
    },
    inputConfirm: {
        borderColor: color.transparent,
        paddingLeft: 0,
    },
    label: {
        fontFamily,
        color: color.blue,
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 2,
    },
    value: {
        fontFamily,
        color: color.lighterBlue,
        fontSize: 12,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 2,
    },
    amount: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 5,
    },
    wollo: {
        alignItems: 'flex-start',
    },
    wolloLabel: {
        fontFamily,
        color: color.lighterBlue,
        fontSize: 14,
        fontWeight: 'bold',
        marginLeft: 10,
        marginTop: 2,
    },
    exchange: {
        fontSize: 14,
        marginBottom: 10,
    },
    scanIcon: {
        width: 14,
        height: 14,
    },
    scanButton: {
        position: 'absolute',
        right: 4,
        top: 48,
        width: 40,
        height: 40,
        paddingTop: 13,
        paddingRight: 13,
        paddingBottom: 13,
        paddingLeft: 13,
    },
    balance: {
        color: color.lighterBlue,
        fontSize: 14,
        marginTop: 5,
        textAlign: 'left',
        fontWeight: 'bold',
    },
});
