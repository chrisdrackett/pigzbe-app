import {StyleSheet} from 'react-native';
import {
    color,
    fontFamily
} from '../../styles';

export default StyleSheet.create({
    wolloContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    balanceContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    currencyLogo: {
        width: 23,
        height: 19,
        marginRight: 10
    },
    balance: {
        fontFamily,
        color: color.white,
        fontSize: 40
    },
    label: {
        fontFamily,
        color: color.whiteOpacity60,
        fontSize: 14,
    },
});
