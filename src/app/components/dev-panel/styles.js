import {StyleSheet} from 'react-native';
import {
    color,
    fontFamily,
    paddingH
} from '../../styles';

export default StyleSheet.create({
    topBar: {
        position: 'absolute',
        top: 30,
        left: 0,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        paddingLeft: paddingH,
        paddingRight: paddingH
    },
    net: {
        backgroundColor: color.green,
        fontFamily,
        fontWeight: 'bold',
        color: color.white,
        fontSize: 12,
        paddingLeft: 4,
        paddingRight: 4
    },
    netLive: {
        backgroundColor: color.red
    },
    settings: {
        width: 18,
        height: 18
    },
    settingsIcon: {
        width: 18,
        height: 18
    },
    closeBtn: {
        position: 'absolute',
        top: 32,
        right: 0,
        paddingRight: paddingH
    },
    closeBtnText: {
        fontFamily,
        fontWeight: 'bold',
        color: color.white,
        fontSize: 16
    },
    overlay: {
        backgroundColor: color.blue,
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: 2
    },
    inner: {
        paddingLeft: paddingH,
        paddingRight: paddingH,
        paddingTop: paddingH
    },
    title: {
        fontFamily,
        fontWeight: 'bold',
        color: color.white,
        fontSize: 18
    },
    text: {
        fontFamily,
        color: color.white,
        fontSize: 14
    },
    switch: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: 25,
        alignItems: 'center',
        justifyContent: 'space-between',
        alignSelf: 'stretch',
        width: '100%',
        marginTop: 20,
        paddingTop: 10,
        marginBottom: 20,
        borderTopWidth: 1,
        borderTopColor: color.mediumGrey
    },
    switchText: {
        fontFamily,
        fontWeight: 'bold',
        color: color.white,
        fontSize: 16
    }
});
