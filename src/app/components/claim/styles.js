import {StyleSheet} from 'react-native';

import {
    color,
    fontFamily,
    paddingH
} from '../../styles';

export default StyleSheet.create({
    container: {
        alignSelf: 'stretch',
        flex: 1,
        backgroundColor: color.blue,
        alignItems: 'center',
        justifyContent: 'center'
    },
    containerLastStep: {
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center',
        alignSelf: 'stretch',
    },
    containerLoading: {
        width: 250,
        flex: 1
    },
    containerButtons: {
        width: '100%',
        paddingLeft: paddingH,
        paddingRight: paddingH,
    },
    containerBodySteps: {
        // backgroundColor: 'red',
        alignItems: 'stretch',
        // width: '100%',
        flex: 1,
        justifyContent: 'center',
    },
    containerBody: {
        // backgroundColor: 'green',
        // width: '100%',
        alignItems: 'stretch',
        paddingLeft: paddingH,
        paddingRight: paddingH,
        flex: 1,
        justifyContent: 'center'
    },
    title: {
        fontFamily,
        color: color.white,
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 20,
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
        color: color.whiteOpacity60,
        fontSize: 14,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20,
        textAlign: 'center'
    },
    error: {
        color: color.red,
        fontSize: 18
    },
    warning: {
        color: color.orange,
        fontWeight: 'bold',
    },
    modalConfirm: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modalTitle: {
        fontSize: 16,
        fontWeight: '600',
    },
    modalTitleCost: {
        marginBottom: 30,
    },
    buttonGreen: {
        width: 200,
        alignSelf: 'center',
        backgroundColor: color.green,
        marginBottom: 10,
    },
    buttonRed: {
        width: 200,
        alignSelf: 'center',
        backgroundColor: color.red
    },
    buttonStyle: {
        borderColor: 'transparent',
        borderWidth: 0,
        borderRadius: 10,
        paddingTop: 10,
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 10,
        margin: 0,
        marginTop: 20,
        maxWidth: 300,
        backgroundColor: color.blue,
    },
    buttonTitleStyle: {
        fontWeight: '600',
    },
    boxKeys: {
        borderRadius: 10,
        borderWidth: 1,
        borderColor: color.white,
        paddingTop: 20,
        paddingBottom: 10,
        paddingLeft: 18,
        paddingRight: 18,
        marginTop: 20,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch'
    },
    boxKeysTitle: {
        fontFamily,
        color: color.white,
        fontWeight: 'bold',
        fontSize: 10,
        textAlign: 'center',
        backgroundColor: color.blue,
        marginTop: -28,
        alignSelf: 'center',
        paddingLeft: 5,
        paddingRight: 5,
    },
    boxTx: {
        backgroundColor: color.green
    },
    boxKeysInner: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    boxKeysText: {
        fontFamily,
        color: color.white,
        fontWeight: 'bold',
        fontSize: 12,
        textAlign: 'left',
        width: 165,
    },
    boxKeysCopy: {
        width: 45,
        height: 45,
    }
});
