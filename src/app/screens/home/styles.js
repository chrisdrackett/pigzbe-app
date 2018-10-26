import {StyleSheet} from 'react-native';
import {color, fontFamily} from 'app/styles';
import isIphoneX from 'app/utils/is-iphonex';

export default StyleSheet.create({
    containerHeader: {
        backgroundColor: color.blue,
        height: '50%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerHeaderKids: {
        height: isIphoneX ? 234 : 204,
        flex: 0,
    },
    containerBody: {
        backgroundColor: color.mediumBlue,
        paddingBottom: 20,
        paddingLeft: '12%',
        paddingRight: '12%',
    },
    containerText: {
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'stretch',
        flexGrow: 1,
        paddingTop: 20
    },
    containerTextKids: {
        flexGrow: 0,
    },
    title: {
        fontFamily,
        color: color.white,
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 10,
        textAlign: 'center'
    },
    titleLarge: {
        fontSize: 25,
        marginTop: 25,
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
        marginBottom: 20,
        textAlign: 'center'
    },
    bold: {
        fontWeight: 'bold',
    },
    error: {
        color: color.red,
        fontSize: 18
    },
    profileWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
    },
    profile: {
        width: 90,
        marginLeft: 16,
        marginRight: 16,
        marginTop: 10,
        marginBottom: 10,
    },
    name: {
        fontFamily,
        color: color.white,
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 8,
    },
    header: {
        position: 'absolute',
        left: 0,
        top: isIphoneX ? 40 : 10,
        right: 0,
    },
    buttons: {
        paddingBottom: isIphoneX ? 30 : 0
    },
});
