import {StyleSheet} from 'react-native';

import {
    container,
    color,
    fontFamily
} from '../../styles';

export default StyleSheet.create({
    container,
    input,
    containerHeader: {
        height: '50vh',
        width: '100vw',
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerBody: {
        height: '50vh',
        width: '100vw',
        paddingTop: '20px',
        paddingLeft: '9.375%',
        paddingRight: '9.375%',
        justifyContent: 'center'
    },

    backgroundImage: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: 0
    },
    image: {
        width: '162px',
        height: '63px'
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
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
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
        fontSize: 14,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20,
        opacity: 0.6,
        textAlign: 'center'
    },
    error: {
        color: color.red,
        fontSize: 18
    }
});
