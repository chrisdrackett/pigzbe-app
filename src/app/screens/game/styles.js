import {StyleSheet, Dimensions} from 'react-native';
import {color} from '../../styles';

export default StyleSheet.create({
    full: {
        backgroundColor: color.earth,
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
    clouds: {
        position: 'absolute',
        top: 75,
        left: 0,
        right: 0,
    },
    tourContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        padding: 30,
    },
    tourContainerFaded: {
        backgroundColor: color.blueOpacity50,
    },
    bubble: {
        position: 'absolute',
        left: 35,
        bottom: 210,
    },
});
