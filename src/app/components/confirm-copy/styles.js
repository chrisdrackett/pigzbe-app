import {StyleSheet} from 'react-native';

import {
    color,
    fontFamily
} from '../../styles';

export default StyleSheet.create({
    title: {
        fontFamily,
        color: color.white,
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20,
        textAlign: 'center'
    },
    subtitle: {
        fontFamily,
        color: color.whiteOpacity60,
        fontSize: 14,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20,
        textAlign: 'center'
    },
    warning: {
        color: color.blue,
        fontSize: 14,
        fontWeight: 'bold',
    },
    checkbox: {
        position: 'relative',
        paddingLeft: 58,
        marginTop: 5,
        marginBottom: 28,
    },
    checkboxCheck: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: color.blue,
        width: 40,
        height: 40,
        position: 'absolute',
        top: 1,
        left: 0,
    },
    checkboxText: {
        marginLeft: 0,
        marginRight: 0,
        marginBottom: 0,
        textAlign: 'left',
    },
    tick: {
        width: 32,
        height: 26,
        marginLeft: 3,
        marginTop: 6,
    },
});
