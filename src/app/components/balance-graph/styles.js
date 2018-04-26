import {StyleSheet} from 'react-native';
import {
    color,
    fontFamily
} from '../../styles';

export default StyleSheet.create({
    container: {
        backgroundColor: color.mediumBlue,
        minHeight: 130,
        alignSelf: 'stretch',
        paddingTop: 10,
        paddingBottom: 20
    },
    containerBalance: {
        width: '50%',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    coin: {
        width: 35,
        height: 35,
        marginRight: 10
    },
    coinName: {
        color: color.white,
        fontFamily,
        fontWeight: 'bold'
    },
    balanceConvert: {
        color: color.white,
        fontFamily,
        fontWeight: 'bold',
        textAlign: 'right',
        marginRight: 3
    },
    graph: {
        marginLeft: -15,
        width: 296,
        height: 44
    },
    wrapperBalance: {
        alignSelf: 'stretch',
        flex: 1,
        flexDirection: 'row',
        paddingLeft: 30,
        paddingRight: 30,
        marginTop: 20
    },
    value: {
        color: color.white,
        fontFamily,
        opacity: 0.6,
        fontWeight: 'bold'
    },
    balanceTotal: {
    },
    percentage: {
        borderRadius: 15,
        backgroundColor: color.green,
        marginTop: 3,
        paddingLeft: 10,
        paddingRight: 10
    }
});
