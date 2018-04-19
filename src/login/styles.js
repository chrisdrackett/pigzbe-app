import {StyleSheet} from 'react-native';

import {
    container,
    input,
    color,
    fontFamily
} from '../styles';

export default StyleSheet.create({
    container,
    input,
    title: {
        fontFamily,
        color: color.white,
        fontSize: 50,
        marginBottom: 20
    },
    error: {
        color: color.red,
        fontSize: 18
    }
});
