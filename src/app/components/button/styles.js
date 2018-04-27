import {StyleSheet} from 'react-native';

import {
    color,
    fontFamily
} from '../../styles';

export default StyleSheet.create({
    buttonHit: {
        alignSelf: 'stretch',
        backgroundColor: color.yellow,
        borderColor: color.yellow,
        borderRadius: 22.5,
        borderWidth: 1,
        marginBottom: 10
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
        color: color.blueOnYellowOpacity40
    },
    buttonPlain: {
        color: color.whiteOnBlueOpacity70,
        fontSize: 14,
        textDecorationLine: 'underline',
        textDecorationStyle: 'solid',
        fontSize: 14,
        textDecorationColor: color.white
    }
});
