import {StyleSheet} from 'react-native';
import {color, fontFamily} from '../../styles';

export default StyleSheet.create({
    paragraph: {
        fontFamily,
        color: color.blue,
        fontSize: 14,
        marginBottom: 20,
        textAlign: 'center',
    },
    bold: {
        fontWeight: 'bold',
    }
});
