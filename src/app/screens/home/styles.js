import {StyleSheet} from 'react-native';

import {
    color,
    fontFamily,
    paddingH
} from '../../styles';

export default StyleSheet.create({
    containerHeader: {
        backgroundColor: color.blue,
        height: '50%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerBody: {
        backgroundColor: color.mediumBlue,
        paddingBottom: 20,
        paddingLeft: paddingH,
        paddingRight: paddingH,
    },
    containerText: {
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'stretch',
        flexGrow: 1,
        paddingTop: 20
    },
    image: {
        width: 162,
        height: 63
    },
    title: {
        fontFamily,
        color: color.white,
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 10,
        textAlign: 'center'
    },
    tagline: {
        fontFamily,
        color: color.white,
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 30,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20,
        textAlign: 'center',
        zIndex: 1,
        position: 'relative'
    },
    subtitle: {
        fontFamily,
        color: color.white,
        fontSize: 16,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20,
        textAlign: 'center'
    },
    error: {
        color: color.red,
        fontSize: 18
    }
});
