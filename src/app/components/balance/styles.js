import {StyleSheet} from 'react-native';
import {
    container,
    color,
    fontFamily,
    paddingTop
} from '../../styles';

export default StyleSheet.create({
    container,
    welcome: {
        fontFamily,
        color: color.white,
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10
    },
    balanceContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        flexDirection: 'row',
        marginTop: 10
    },
    logo: {
        width: 65,
        height: 25,
        marginBottom: 10
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
        color: color.white,
        fontSize: 14,
        opacity: 0.6
    },
    settingsIcon: {
        width: 18,
        height: 18
    },
    settings: {
        // backgroundColor: color.yellow,
        width: 18,
        height: 18,
        position: 'absolute',
        top: paddingTop + 20,
        right: 20
    }
});
