import {StyleSheet} from 'react-native';
import {fontFamily, color} from '../../styles';

export default StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    image: {
        marginTop: 20,
    },
    header: {
        fontFamily,
        color: color.white,
        fontSize: 22,
        fontWeight: 'bold',
    },
    picker: {
        backgroundColor: color.white
    }
});
