import {StyleSheet} from 'react-native';

import {
    color,
    fontFamily
} from '../../styles';

export default StyleSheet.create({
    dateIcon: {
        display: 'none',
    },
    dateInput: {
        alignSelf: 'stretch',
        color: color.blue,
        fontSize: 14,
        fontWeight: 'bold',
        borderWidth: 0,
        height: 45,
        borderRadius: 22.5,
        textAlignVertical: 'top',
        lineHeight: 21,
        paddingTop: 16,
    },
    dateText: {
        color: color.blue,
        width: '100%',
        fontWeight: 'bold',
    },
    dateTouchBody: {
        color: color.lighterBlue,
        height: 45,
        marginBottom: 20,
    },
    placeholderText: {
        width: '100%',
        color: color.lighterBlue,
        fontWeight: 'bold',
    },
    btnTextConfirm: {
        color: color.blue,
    },
})