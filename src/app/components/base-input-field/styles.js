import {StyleSheet} from 'react-native';

import {
    color,
    fontFamily
} from '../../styles';

export default StyleSheet.create({
    input: {
        alignSelf: 'stretch',
        borderColor: color.lighterBlue,
        borderWidth: 1,
        borderRadius: 22.5,
        marginBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
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
        borderColor: color.red
    },
    placeholder: {
        position: 'absolute',
        left: 20,
        fontFamily,
        color: color.blue,
        fontWeight: 'bold',
        fontSize: 14,
    },
    placeholderTop: {
        fontSize: 10,
    },
});
