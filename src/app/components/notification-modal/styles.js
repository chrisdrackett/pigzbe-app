import {StyleSheet} from 'react-native';

import {fontFamily, color} from '../../styles';

export default StyleSheet.create({
    overlay: {
        backgroundColor: color.blueOpacity80,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    outerContainer: {
        paddingTop: 33,
        paddingBottom: 33,
    },
    container: {
        marginLeft: 32,
        marginRight: 32,
        backgroundColor: color.white,
        paddingTop: 43,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 20,
        borderRadius: 4,
        display: 'flex',
        alignItems: 'center',
        minWidth: 250,
    },
    iconContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        display: 'flex',
        alignItems: 'center',
    },
    icon: {
        width: 67,
        height: 67,
    },
    button: {
        marginTop: 20,
        width: 'auto',
        paddingLeft: 15,
        paddingRight: 15,
    },
    title: {
        fontFamily,
        color: color.blue,
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    text: {
        fontFamily,
        color: color.blue,
        textAlign: 'center',
    }
});
