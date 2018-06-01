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
        fontWeight: 'bold',
        height: 45,
        borderColor: color.white,
        borderWidth: 1,
        borderRadius: 22.5,
        marginBottom: 10,
        paddingLeft: 30,
        paddingRight: 20
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
