import {StyleSheet} from 'react-native';

import {
    paddingH,
    color,
    fontFamily,
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
    bottom: {
        // alignSelf: 'stretch',
        // flex: 1,
        // justifyContent: 'flex-end',
        // backgroundColor: 'blue',
        paddingTop: 30,
        paddingBottom: 12,
        paddingLeft: paddingH,
        paddingRight: paddingH,
    },
    subtitle: {
        fontFamily,
        color: color.blue,
        fontSize: 16,
        marginLeft: 0,
        marginRight: 0,
        marginBottom: 20,
        textAlign: 'center'
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
    }
});
