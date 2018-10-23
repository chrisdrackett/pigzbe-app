import {StyleSheet} from 'react-native';
import {color, fontFamily} from 'app/styles';
import isIphoneX from 'app/utils/is-iphonex';

export default StyleSheet.create({
    alert: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: color.transparent,
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        paddingTop: isIphoneX ? 25 : 10,
        zIndex: 1,
    },
    alert__error: {
        backgroundColor: color.errorRedOpacity95,
    },
    alert__warning: {
        backgroundColor: color.warningOrangeOpacity95,
    },
    alert__success: {
        backgroundColor: color.successGreenOpacity95,
    },
    message: {
        fontFamily,
        color: color.white,
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'left',
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 20,
        width: '75%',
    },
    dismiss: {
        marginRight: 10
    },
    closeIcon: {
        height: 13
    },
    close: {
        width: 40,
        height: 40,
        padding: 12,
    },
});
