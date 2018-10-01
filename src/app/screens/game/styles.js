import {StyleSheet, Dimensions} from 'react-native';
import {color} from '../../styles';

export default StyleSheet.create({
    full: {
        backgroundColor: color.skyBlue,
        alignSelf: 'stretch',
        flex: 1
    },
    counter: {
        position: 'absolute',
        top: 30,
        left: 15,
    },
    trees: {
        // backgroundColor: 'red',
        flexDirection: 'row',
        position: 'absolute',
        bottom: 80,
        left: Dimensions.get('window').width / 2 - 100,
        // width: '100%',
        alignItems: 'flex-start',
    },
});
