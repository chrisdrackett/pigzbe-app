import {StyleSheet} from 'react-native';

import {
    container,
    input,
    color,
    fontFamily
} from '../../styles';

export default StyleSheet.create({
    container,
    input,
    title: {
        fontFamily,
        color: color.white,
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20,
        textAlign: 'center'
    },
    tagline: {
        fontFamily,
        color: color.white,
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20,
        textAlign: 'center'
    },
    subtitle: {
        fontFamily,
        color: color.white,
        fontSize: 20,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20,
        textAlign: 'center'
    },
    error: {
        color: color.red,
        fontSize: 18
    }
});
