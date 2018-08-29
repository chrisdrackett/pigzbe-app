import {StyleSheet} from 'react-native';

import {
    color,
    fontFamily
} from '../../styles';

export default StyleSheet.create({
    container: {
        backgroundColor: color.white,
        color: color.blue,
    },
    active: {
        backgroundColor: color.pink,
        borderColor: color.pink,
    },
    hit: {
        width: '100%',
        backgroundColor: color.white,
        borderColor: color.mediumBlue,
        borderRadius: 22.5,
        borderWidth: 1,
        marginBottom: 20,
        maxWidth: 400,
    },
    text: {
        fontFamily,
        fontWeight: 'bold',
        alignSelf: 'center',
        color: color.blue,
        fontSize: 14,
        textAlign: 'center'
    },
    hit__disabled: {
        backgroundColor: color.mediumBlueOpacity50,
        borderColor: color.transparent,
    },
    text__disabled: {
        color: color.white,
    },
});
