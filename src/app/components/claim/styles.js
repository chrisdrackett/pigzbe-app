import {StyleSheet} from 'react-native';

import {
    color,
    fontFamily,
    paddingH
} from '../../styles';

export default StyleSheet.create({
    container: {
        alignSelf: 'stretch',
        width: '100%',
        flex: 1,
        backgroundColor: color.blue,
        alignItems: 'center',
    },
    containerLastStep: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerLoading: {
        width: 250,
        flex: 1
    },
    containerButtons: {
        position: 'absolute',
        bottom: 20,
        width: '100%',
        maxWidth: 280,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerFields: {
        width: '100%',
        alignSelf: 'stretch',
        justifyContent: 'center',
        paddingLeft: paddingH,
        paddingRight: paddingH,
    },
    containerBody: {
        width: '100%',
        flex: 1,
        alignSelf: 'stretch',
        alignItems: 'center',
        paddingTop: 10,
    },
    title: {
        fontFamily,
        color: color.white,
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20,
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
        fontSize: 15,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20,
        textAlign: 'center'
    },
    error: {
        color: color.red,
        fontSize: 18
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
        backgroundColor: 'green',
        marginBottom: 10,
    },
    buttonRed: {
        width: 200,
        alignSelf: 'center',
        backgroundColor: 'red'
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
        backgroundColor: '#003278',
    },
    buttonTitleStyle: {
        fontWeight: '600',
    },
    boxKeys: {
        borderRadius: 10,
        paddingTop: 5,
        paddingBottom: 5,
        margin: 0,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    boxTx: {
        backgroundColor: color.green
    },
    boxPrivateKey: {
        backgroundColor: color.pink
    },
    boxPublicKey: {
        backgroundColor: color.lightBlue
    },
    boxKeyText: {
        fontWeight: 'bold',
        color: color.blue
    }
});
