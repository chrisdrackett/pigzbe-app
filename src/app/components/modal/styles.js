import {StyleSheet} from 'react-native';

import {color} from '../../styles';

export default StyleSheet.create({
    overlay: {
        backgroundColor: color.blueOpacity80,
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        borderRadius: 10,
        backgroundColor: color.white,
        paddingTop: 22,
        paddingBottom: 8,
        paddingLeft: 20,
        paddingRight: 20,
        justifyContent: 'center',
        alignItems: 'center',
        width: 284,
    },
    bird: {
        width: 68,
        alignSelf: 'center',
    },
});
