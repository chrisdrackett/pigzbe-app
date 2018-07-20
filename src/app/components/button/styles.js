import {StyleSheet} from 'react-native';

import {
    color,
    fontFamily
} from '../../styles';

export default StyleSheet.create({
    buttonHit: {
        alignSelf: 'stretch',
        backgroundColor: color.white,
        borderColor: color.white,
        borderRadius: 22.5,
        borderWidth: 1,
        marginBottom: 10
    },
    buttonHitSecondary: {
        backgroundColor: color.mediumBlue,
        borderColor: color.white
    },
    buttonHitOutline: {
        backgroundColor: color.transparent,
        borderColor: color.blue
    },
    buttonTextSecondary: {
        color: color.white
    },
    button: {
        fontFamily,
        fontWeight: 'bold',
        alignSelf: 'stretch',
        color: color.blue,
        fontSize: 16,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        height: 45,
        textAlign: 'center'
    },
    buttonDisabled: {
        color: color.blueOpacity40
    },
    buttonPlain: {
        color: color.whiteOpacity70,
        fontSize: 14,
        textDecorationLine: 'underline',
        textDecorationStyle: 'solid',
        fontSize: 14,
        textDecorationColor: color.white
    }
});
