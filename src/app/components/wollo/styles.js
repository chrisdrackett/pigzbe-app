import {StyleSheet} from 'react-native';
import {
    color,
    fontFamily
} from '../../styles';

export default StyleSheet.create({
    wolloContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    balanceContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    currencyLogo: {
        width: 23,
        height: 23,
        marginRight: 10,
    },
    balance: {
        fontFamily,
        fontWeight: 'bold',
        color: color.white,
        fontSize: 22,
    },
    label: {
        fontFamily,
        fontWeight: 'bold',
        color: color.whiteOpacity60,
        fontSize: 14,
    },
    balance__dark: {
        color: color.blue,
    },
    label__dark: {
        color: color.blue,
    },
});
