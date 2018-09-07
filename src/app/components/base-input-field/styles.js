import {StyleSheet} from 'react-native';

import {
    color,
    fontFamily
} from '../../styles';

export default StyleSheet.create({
    container: {
        marginBottom: 10,
    },
    input: {
        alignSelf: 'stretch',
        borderColor: color.lighterBlue,
        borderWidth: 1,
        borderRadius: 22.5,
        paddingLeft: 22,
        paddingRight: 22,
    },
    label: {
        fontFamily,
        color: color.blue,
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 2,
    },
    error: {
        borderColor: color.errorRed
    },
    placeholder: {
        position: 'absolute',
        left: 22,
        fontFamily,
        color: color.blue,
        fontWeight: 'bold',
        fontSize: 14,
    },
    placeholderTop: {
        fontSize: 10,
    },
    errorText: {
        fontFamily,
        color: color.errorRed,
        fontSize: 9,
        paddingLeft: 23,
        marginTop: 5,
    }
});
