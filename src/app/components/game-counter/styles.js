import {StyleSheet} from 'react-native';
import {color} from '../../styles';

export default StyleSheet.create({
    wrapper: {
        backgroundColor: color.blackOpacity10,
        height: 33,
        borderRadius: 33 / 2,
        paddingBottom: 2,
    },
    container: {
        backgroundColor: color.white,
        height: 31,
        borderRadius: 31 / 2,
        paddingTop: 2,
        paddingBottom: 2,
        paddingLeft: 5,
        paddingRight: 6,
    },
});
