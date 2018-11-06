import {StyleSheet} from 'react-native';
import {paddingH, color} from '../../styles';
import {MAX_INNER_WIDTH} from '../../constants';

export default StyleSheet.create({
    container: {
        alignSelf: 'center',
        width: '88.75%',
        borderTopRightRadius: 5,
        borderTopLeftRadius: 5,
        maxWidth: MAX_INNER_WIDTH,
        flex: 1,
    },
    containerText: {
        paddingLeft: paddingH,
        paddingRight: paddingH,
        paddingTop: 30,
    },
    wrapper: {
        display: 'flex',
        flex: 1,
    },
    pad: {
        paddingBottom: 12,
        paddingLeft: paddingH,
        paddingRight: paddingH,
    },
    bg: {
        backgroundColor: color.mediumBlue,
        position: 'absolute',
        top: 242,
        bottom: 0,
        left: 0,
        right: 0,
    },
    error: {
        color: color.red,
    },
    safeArea: {
        flex: 1,
        backgroundColor: color.blue,
    },
    safeAreaBottom: {
        backgroundColor: color.mediumBlue,
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        height: 100,
        zIndex: -1000,
    },
    safeAreaBottomInner: {
        backgroundColor: color.white,
        width: '88.75%',
        marginLeft: '5.625%',
        marginRight: '5.625%',
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        height: 100,
        zIndex: -999,
    },
});
