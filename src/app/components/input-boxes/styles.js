import {StyleSheet} from 'react-native';
import {color} from '../../styles';

export default StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    textView: {
        height: 45,
        borderColor: color.white,
        borderWidth: 1,
        borderRadius: 5,
        marginLeft: 5
    },
    text: {
        height: 45
    },
    codeInputStyle: {
        borderRadius: 10
    }
});
