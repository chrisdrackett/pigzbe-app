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
        color: color.orange,
        fontWeight: 'bold',
    },
    checkbox: {
        position: 'relative',
        paddingLeft: 50,
    },
    checkboxCheck: {
        borderRadius: 5,
        borderWidth: 2,
        borderColor: color.blue,
        width: 30,
        height: 30,
        position: 'absolute',
        top: 6,
        left: 6,
    },
    checkboxActive: {
        backgroundColor: color.blue,
    },
    checkboxText: {
        marginLeft: 0,
        marginRight: 20,
        textAlign: 'left',
    }
});
