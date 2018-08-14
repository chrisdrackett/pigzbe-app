import {StyleSheet} from 'react-native';
import {color} from '../../styles';

export default StyleSheet.create({
    image: {
        width: 48,
        height: 48,
        marginRight: 10,
    },
    image__large: {
        width: 90,
        height: 90,
        marginRight: 0,
    },
    photo: {
        borderRadius: 24,
        borderWidth: 2,
        borderColor: color.skyBlue,
    },
    photo__large: {
        borderRadius: 45,
    },
});
