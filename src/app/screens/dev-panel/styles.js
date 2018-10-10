import {StyleSheet} from 'react-native';
import {
    color,
    fontFamily,
    paddingH
} from '../../styles';

export default StyleSheet.create({
    topBar: {
        position: 'absolute',
        top: 25,
        width: '70%',
        right: 0,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
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
        width: 38,
        height: 38,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 10,
    },
    settingsIcon: {
        width: 18,
        height: 18
    },
    closeBtn: {
        position: 'absolute',
        top: 32,
        right: paddingH,
        paddingRight: 10,
        width: 38,
        height: 38,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
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
    block: {
        flex: 1,
        marginBottom: 10,
        marginTop: 10,
    },
    button: {
        marginBottom: 10,
        marginTop: 10,
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
    subtitle: {
        fontFamily,
        fontWeight: 'bold',
        color: color.white,
        fontSize: 16
    },
    picker: {
        backgroundColor: color.white,
        borderRadius: 8,
        marginBottom: 10,
        marginTop: 10,
    },
});
