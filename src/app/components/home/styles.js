import {StyleSheet} from 'react-native';

import {
    color,
    fontFamily,
    paddingH
} from '../../styles';

export default StyleSheet.create({
    container: {
        // alignSelf: 'stretch',
        flex: 1,
        // backgroundColor: color.blue,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center'
    },
    containerHeader: {
        backgroundColor: color.blue,
        height: '50%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerBody: {
        alignItems: 'stretch',
        paddingLeft: paddingH,
        paddingRight: paddingH,
        justifyContent: 'space-between',
        paddingBottom: 20
    },
    containerText: {
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'stretch',
        flexGrow: 1,
        paddingTop: 20
    },
    containerBodyKeyb: {
        backgroundColor: color.blue
    },
    backgroundImage: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: 0
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
