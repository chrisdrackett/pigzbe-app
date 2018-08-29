import {StyleSheet} from 'react-native';

import {
    color,
    fontFamily
} from '../../styles';

export default StyleSheet.create({
    input: {
        borderColor: color.lighterBlue,
        borderWidth: 1,
        borderRadius: 22.5,
        marginBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 45,
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
    text: {
        fontFamily,
        color: color.blue,
        fontSize: 14,
        fontWeight: 'bold',
    },
    placeholder: {
        fontFamily,
        color: color.lighterBlue,
        fontSize: 14,
        fontWeight: 'bold',
    },
    arrow: {
        width: 11,
        height: 7,
    },
    picker: {
        flex: 1,
    },
    pickerSpacer: {
        flex: 1,
    },
    pickerBar: {
        backgroundColor: color.white,
        borderTopColor: color.lighterBlue,
        borderTopWidth: 1,
        borderBottomColor: color.lighterBlue,
        borderBottomWidth: 1,
        padding: 10,
        alignItems: 'flex-end'
    },
    pickerBack: {
        fontFamily,
        color: color.blue,
        fontSize: 16,
    },
    pickerContent: {
        height: 222,
        backgroundColor: color.lightGrey,
    },
    pickerItem: {
        color: color.blue,
    },
});
