import {StyleSheet} from 'react-native';
import {
    color,
    fontFamily
} from '../../styles';

export default StyleSheet.create({
    containerForm: {
        width: '100%',
    },
    amount: {
        position: 'relative',
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
    estimate: {
        fontFamily,
        color: color.lighterBlue,
        fontSize: 14,
        // fontStyle: 'italic',
        marginBottom: 5,
    },
    buttonWrapper: {
        marginTop: 20,
    },
    amountMinus: {
        fontFamily,
        color: color.red,
        fontSize: 14,
        fontStyle: 'italic',
        marginLeft: 42,
        marginTop: -20,
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
    }
});
