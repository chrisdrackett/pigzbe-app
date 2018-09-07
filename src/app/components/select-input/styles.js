import {StyleSheet} from 'react-native';

import {
    color,
    fontFamily
} from '../../styles';

export default StyleSheet.create({
    input: {  
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 1,
    },
    text: {
        fontFamily,
        color: color.blue,
        fontSize: 14,
        fontWeight: 'bold',
        paddingTop: 12,
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
