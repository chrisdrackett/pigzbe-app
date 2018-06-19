import {StyleSheet} from 'react-native';

import {
    color,
    fontFamily
} from '../../styles';

export default StyleSheet.create({
    input: {
        fontFamily,
        alignSelf: 'stretch',
        color: color.white,
        fontSize: 14,
        // lineHeight: 15,
        fontWeight: 'bold',
        borderColor: color.white,
        borderWidth: 1,
        borderRadius: 22.5,
        marginBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 12,
    },
    dark: {
        borderColor: color.blue,
        color: color.blue,
    },
    label: {
        fontFamily,
        color: color.white,
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 2,
    },
    labelDark: {
        color: color.blue,
    },
    error: {
        borderColor: color.red
    }
});
