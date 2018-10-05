import {StyleSheet} from 'react-native';
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
        flexDirection: 'row',
        position: 'absolute',
        bottom: 75,
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
