import {StyleSheet} from 'react-native';

import {
    color,
    fontFamily
} from '../../styles';

export default StyleSheet.create({
    input: {
        fontFamily,
        alignSelf: 'stretch',
        color: color.blue,
        fontSize: 14,
        fontWeight: 'bold',
        borderColor: color.lighterBlue,
        borderWidth: 1,
        borderRadius: 22.5,
        marginBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 12,
        textAlignVertical: 'top',
        lineHeight: 21,
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
    }
});
