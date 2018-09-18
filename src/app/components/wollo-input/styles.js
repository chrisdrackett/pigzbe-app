import {StyleSheet} from 'react-native';
import {color} from '../../styles';

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
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    textInput: {
        flex: 1,
        paddingRight: 5,
    },
    toggle: {
        marginBottom: 10,
    },
});
