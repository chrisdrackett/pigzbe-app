import {StyleSheet} from 'react-native';

import {
    container,
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
    containerLoading: {
      width: 250,
      flex: 1
    },
    containerBodySteps: {
      alignItems: 'center',
      width: '100%',
      flex: 1,
      paddingLeft: paddingH - 10,
      paddingRight: paddingH - 10,
      justifyContent: 'center'
    },
    containerBody: {
        width: '100%',
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
    }
});
