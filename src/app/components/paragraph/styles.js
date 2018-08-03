import {StyleSheet} from 'react-native';
import {color, fontFamily} from '../../styles';

export default StyleSheet.create({
    paragraph: {
        fontFamily,
        color: color.blue,
        fontSize: 16,
        marginBottom: 18,
        textAlign: 'center',
    },
    bold: {
        fontWeight: 'bold',
    },
    small: {
        fontSize: 14,
    },
});
