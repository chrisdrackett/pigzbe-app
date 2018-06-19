import {StyleSheet} from 'react-native';
import {
    color,
    fontFamily,
    paddingH
} from '../../styles';

export default StyleSheet.create({
    scrollView: {
        flex: 1
    },
    contentContainer: {
        flexGrow: 1,
        backgroundColor: 'red',
    },
    container: {
        alignSelf: 'stretch',
        flex: 1,
        backgroundColor: color.blue,
        alignItems: 'center',
        justifyContent: 'center'
    },
    pig: {
        marginTop: 20,
        alignSelf: 'center',
    },
    containerBody: {
        backgroundColor: color.lightGrey,
        width: '100%',
        paddingLeft: paddingH,
        paddingRight: paddingH,
        paddingBottom: 20,
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    containerForm: {
        width: '100%',
    },
    title: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 10
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
        color: color.grey,
        fontSize: 14,
        fontStyle: 'italic',
        marginBottom: 5,
    },
    buttonWrapper: {
        marginTop: 20,
    },
    amountInputConfirm: {
        paddingLeft: 42,
        paddingRight: 0,
        borderColor: color.lightGrey,
    },
    inputConfirm: {
        paddingLeft: 0,
        paddingRight: 0,
        borderColor: color.lightGrey,
        color: color.grey,
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
});
