import {StyleSheet} from 'react-native';
import {
    container,
    color,
    fontFamily,
    paddingH
} from '../../styles';

export default StyleSheet.create({
    container,
    pig: {
        marginTop: 20,
    },
    containerBody: {
        backgroundColor: color.lightGrey,
        width: '100%',
        paddingLeft: paddingH,
        paddingRight: paddingH,
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
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
        color: color.grey,
        fontSize: 14,
        fontStyle: 'italic',
        marginBottom: 5,
    },
});
