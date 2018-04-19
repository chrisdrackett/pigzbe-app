import {StyleSheet} from 'react-native';

import {
    color,
    fontFamily
} from '../styles';

export default StyleSheet.create({
    buttonHit: {
        alignSelf: 'stretch',
        backgroundColor: color.yellow,
        borderColor: color.yellow,
        borderRadius: 25,
        borderWidth: 1,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20
    },
    button: {
        fontFamily,
        alignSelf: 'stretch',
        color: color.black,
        fontSize: 18,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        height: 50,
        textAlign: 'center'
    },
    buttonPlain: {
        color: color.white,
        textDecorationLine: 'underline',
        textDecorationStyle: 'solid',
        textDecorationColor: color.white
    }
});
