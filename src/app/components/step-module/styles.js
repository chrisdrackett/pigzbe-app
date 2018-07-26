import {StyleSheet} from 'react-native';

import {
    paddingH,
    color,
} from '../../styles';

export default StyleSheet.create({
    containerText: {
        // alignItems: 'stretch',
        paddingLeft: paddingH,
        paddingRight: paddingH,
        paddingTop: 30,
        // flex: 0,
        // backgroundColor: 'green'
    },
    containerBody: {
        // alignSelf: 'stretch',
        // flex: 1,
        // justifyContent: 'flex-end',
        // backgroundColor: 'blue'
    },
    pad: {
        // alignSelf: 'stretch',
        // flex: 1,
        // justifyContent: 'flex-end',
        // backgroundColor: 'blue',
        paddingTop: 30,
        paddingBottom: 12,
        paddingLeft: paddingH,
        paddingRight: paddingH,
    },
    wrapper: {
        // alignItems: 'center',
        // flexGrow: 1,
        // flex: 1,
        // alignSelf: 'center'
    },
    bg: {
        backgroundColor: color.mediumBlue,
        height: '50%',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    error: {
        color: color.red,
    }
});
