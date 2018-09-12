import {StyleSheet, Dimensions} from 'react-native';

import {
    color
} from '../../styles';

export default StyleSheet.create({
    text: {
        color: color.lighterBlue,
        fontSize: 16,
        marginTop: 5,
        textAlign: 'left',
        fontStyle: 'italic',
    },
    inputSection: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    textInput: {
        width: Dimensions.get('window').width - 225,
    },
    toggle: {
        marginBottom: 10,
    },
});
