import {StyleSheet} from 'react-native';

import {
    color,
    fontFamily
} from '../../styles';

export default StyleSheet.create({
    box: {
        backgroundColor: color.lightRed,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: color.lightRed,
        paddingTop: 9,
        paddingBottom: 9,
        paddingLeft: 18,
        paddingRight: 18,
    },
    content: {
        fontFamily,
        color: color.white,
        fontSize: 14,
        textAlign: 'center',
    },
    bold: {
        fontWeight: 'bold',
    },
});
