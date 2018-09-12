import {StyleSheet} from 'react-native';
import {
    color,
    fontFamily,
    paddingH
} from '../../styles';

export default StyleSheet.create({
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
        top: -8,
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
    box: {
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
    boxAddText: {
        fontFamily,
        color: color.blueOpacity50,
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 5,
    },
});
