import {StyleSheet} from 'react-native';
import {color} from '../../styles';

export default StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    image: {
        marginTop: 8,
        marginBottom: -30,
        width: 200,
        height: 100,
        // backgroundColor: color.red
    },
    noImage: {
        // backgroundColor: color.red
        // height: 78,
        minHeight: 78,
    },
    noTitle: {
        // backgroundColor: color.red
        // height: 32,
        minHeight: 32,
    },
    picker: {
        backgroundColor: color.white
    },
});
