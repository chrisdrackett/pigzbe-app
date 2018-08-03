import {StyleSheet} from 'react-native';
import {color} from '../../styles';

export default StyleSheet.create({
    wrapper: {
        position: 'relative',
        width: '100%',
    },
    border: {
        backgroundColor: color.blackOpacity5,
        // backgroundColor: 'red',
        height: 5,
        position: 'absolute',
        bottom: 50,
        left: 0,
        right: 0,
        zIndex: 1
    },
});
