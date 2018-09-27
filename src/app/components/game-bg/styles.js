import {StyleSheet} from 'react-native';
import {color} from '../../styles';

// uikit width of widest ios screen
export const MAP_WIDTH = 1366;

export default StyleSheet.create({
    wrapper: {
        flex: 1,
        position: 'relative',
        backgroundColor: color.skyBlueBottom,
    },
    scrollable: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        width: MAP_WIDTH,
    },
    sky: {
        backgroundColor: color.skyBlueTop,
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '24%',
    },
    sunWrapper: {
        alignItems: 'center',
        position: 'absolute',
        bottom: -40,
        left: 0,
        width: '100%',
    },
    sun: {
        width: 406,
        height: 406,
    },
    ground: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        height: 148,
        width: '100%',
    },
    mountains: {
        position: 'absolute',
        bottom: 148,
        width: 560,
        height: 210,
    },
    mountainsLeft: {
        left: 33,
    },
    mountainsRight: {
        left: 33 + 560 + 180,
    },
    foliage: {
        position: 'absolute',
        bottom: 148,
        // left: -14,
        left: 33 + 440 - 14,
        width: 105,
        height: 25,
    },
    grass: {
        position: 'absolute',
        bottom: 148,
        width: 67,
        height: 7,
    },
    grassLeft: {
        left: 33 + 440 - 10,
    },
    grassRight: {
        left: 33 + 440 + 67 + 260,
    },
});
