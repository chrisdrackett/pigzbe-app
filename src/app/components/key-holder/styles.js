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
        paddingTop: 18,
        paddingBottom: 18,
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: 20,
        marginBottom: 20,
        width: 300,
    },
    content: {
        fontFamily,
        color: color.white,
        fontSize: 14,
        fontWeight: 'bold',
    },
    normal: {
        fontWeight: 'normal',
    },
});
