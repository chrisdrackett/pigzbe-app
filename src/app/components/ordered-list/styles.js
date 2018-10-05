import {StyleSheet} from 'react-native';
import {color, fontFamily} from '../../styles';

export default StyleSheet.create({
    listItem: {
        marginBottom: 2,
        paddingLeft: 30,
        position: 'relative',
    },
    text: {
        fontFamily,
        color: color.blue,
        fontSize: 14,
        textAlign: 'left',
        marginBottom: 10,
    },
    num: {
        position: 'absolute',
        top: 0,
        left: 0,
    },
});
