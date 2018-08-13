import {StyleSheet} from 'react-native';
import {
    color,
    fontFamily,
    paddingH
} from '../../styles';

export default StyleSheet.create({
    container: {
        paddingTop: 25,
        paddingBottom: 20,
    },
    title: {
        fontFamily,
        color: color.white,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 12,
    },
    add: {
        paddingLeft: paddingH,
        paddingRight: paddingH,
    },
    plus: {
        width: 40,
        height: 40,
        position: 'absolute',
        top: 16,
        right: -8,
        paddingTop: 12,
        paddingRight: 12,
        paddingBottom: 12,
        paddingLeft: 12,
    },
    plusIcon: {
        width: 16,
        height: 16
    },
    kid: {
        backgroundColor: color.white,
        borderColor: color.white,
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingTop: 20,
        paddingBottom: 12,
        paddingLeft: paddingH,
        paddingRight: paddingH,
    },
    id: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    image: {
        width: 48,
        height: 48,
        marginRight: 10,
    },
    photo: {
        borderRadius: 24,
        borderWidth: 2,
        borderColor: color.skyBlue,
    },
    name: {
        fontFamily,
        color: color.blue,
        fontSize: 16,
        fontWeight: 'bold',
    },
    balance: {
        position: 'absolute',
        right: 0,
        top: 0,
        paddingRight: 16,
    },
    chevron: {
        width: 7,
        height: 12,
        position: 'absolute',
        right: 0,
        top: 10,
    },
    valueWrapper: {
        position: 'relative',
        marginLeft: 20,
        marginRight: 20,
    },
    value: {
        backgroundColor: color.blue,
        borderRadius: 5,
        color: color.white,
        width: 34,
        height: 28,
        paddingTop: 4,
        marginLeft: -17,
    },
    valueText: {
        fontFamily,
        color: color.white,
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    exchange: {
        fontFamily,
        color: color.lighterBlue,
        fontSize: 12,
        fontWeight: 'bold',
        textAlign: 'right',
        marginBottom: 10,
        paddingRight: 6,
    },
});
