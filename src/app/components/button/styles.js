import {StyleSheet} from 'react-native';

import {
    color,
    fontFamily
} from '../../styles';

export default StyleSheet.create({
    container: {
        alignSelf: 'stretch',
        alignItems: 'center',
    },
    hit: {
        width: '100%',
        backgroundColor: color.blue,
        borderColor: color.blue,
        borderRadius: 22.5,
        borderWidth: 1,
        marginBottom: 10,
        maxWidth: 400,
    },
    text: {
        fontFamily,
        fontWeight: 'bold',
        alignSelf: 'stretch',
        color: color.white,
        fontSize: 14,
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 12,
        height: 45,
        textAlign: 'center'
    },
    hit__disabled: {
        backgroundColor: color.mediumBlueOpacity50,
        borderColor: color.transparent,
    },
    text__disabled: {
        color: color.white,
    },

    // theme light

    hit__light: {
        backgroundColor: color.white,
        borderColor: color.white,
    },
    text__light: {
        color: color.blue,
    },
    hit__disabled__light: {
        backgroundColor: color.whiteOpacity60,
        borderColor: color.transparent,
    },
    text__disabled__light: {
        color: color.blueOpacity40,
    },

    // theme outline

    hit__outline: {
        backgroundColor: color.transparent,
        borderColor: color.blue,
    },
    text__outline: {
        color: color.blue,
    },
    hit__disabled__outline: {
        backgroundColor: color.transparent,
        borderColor: color.blueOpacity40,
    },
    text__disabled__outline: {
        color: color.blueOpacity40,
    },

    // theme plain

    hit__plain: {
        backgroundColor: color.transparent,
        borderColor: color.transparent,
    },
    text__plain: {
        color: color.blue,
        textDecorationLine: 'underline',
        textDecorationStyle: 'solid',
        textDecorationColor: color.blue,
    },
    hit__disabled__plain: {
        backgroundColor: color.transparent,
        borderColor: color.transparent,
    },
    text__disabled__plain: {
        color: color.blueOpacity40,
        textDecorationColor: color.blueOpacity40,
    },

    // theme plain-light

    hit__plain_light: {
        backgroundColor: color.transparent,
        borderColor: color.transparent,
    },
    text__plain_light: {
        color: color.white,
        textDecorationLine: 'underline',
        textDecorationStyle: 'solid',
        textDecorationColor: color.white,
    },
    hit__disabled__plain_light: {
        backgroundColor: color.transparent,
        borderColor: color.transparent,
    },
    text__disabled__plain_light: {
        color: color.whiteOpacity60,
        textDecorationColor: color.whiteOpacity60,
    },
    error: {
        textDecorationColor: color.errorRed,
    }
});
