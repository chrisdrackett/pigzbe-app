import {StyleSheet} from 'react-native';
import {color} from '../../styles';

export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
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
    }
});
