import {StyleSheet} from 'react-native';
import {
    color,
    fontFamily
} from '../../styles';

export default StyleSheet.create({
    labelText: {
        fontFamily,
        color: color.grey,
        fontSize: 14,
        textAlign: 'center',
    },
    centered: {
        marginLeft: 'auto',
        marginRight: 'auto',
    }
});
