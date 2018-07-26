import {StyleSheet} from 'react-native';
import {color} from '../../styles';

export default StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    image: {
        marginTop: 0,
        marginBottom: -25,
        width: 121,
        height: 108,
        // backgroundColor: color.red
    },
    noImage: {
        // backgroundColor: color.red
    },
    picker: {
        backgroundColor: color.white
    }
});
