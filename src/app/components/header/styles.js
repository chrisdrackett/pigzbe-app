import {StyleSheet} from 'react-native';
import {color} from '../../styles';

const btnSize = 40;

const getPadding = (w, h) => ({
    paddingTop: (btnSize - h) / 2,
    paddingRight: (btnSize - w) / 2,
    paddingBottom: (btnSize - h) / 2,
    paddingLeft: (btnSize - w) / 2,
});

export default StyleSheet.create({
    container: {
        backgroundColor: color.blue,
        justifyContent: 'center',
        alignItems: 'center',
    },
    settingsIcon: {
        width: 18,
        height: 18
    },
    settings: {
        width: btnSize,
        height: btnSize,
        position: 'absolute',
        top: 24,
        right: 10,
        ...getPadding(18, 18)
    },
    back: {
        // backgroundColor: 'red',
        width: btnSize,
        height: btnSize,
        position: 'absolute',
        top: 24,
        left: 10,
        ...getPadding(14, 11)
    },
    backIcon: {
        width: 14,
        height: 11,
    },
    customTitle: {
        marginTop: 34,
        marginBottom: 10,
        color: color.lighterBlue,
        fontSize: 14,
    }
});
