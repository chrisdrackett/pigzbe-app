import {StyleSheet} from 'react-native';

import {
    color,
    fontFamily,
    paddingH
} from '../../styles';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.blue,
        backgroundColor: 'magenta',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        alignSelf: 'stretch',
        backgroundColor: color.blue,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 69,
        flexBasis: 69,
        flexGrow: 0,
        position: 'relative',
        zIndex: 1,
    },
    containerLoading: {
        flex: 1
    },
    containerChildren: {
        alignSelf: 'stretch',
        alignItems: 'stretch',
    },
    alignLeft: {
        textAlign: 'left',
    },
    containerButtons: {
        paddingTop: 20,
    },
    containerFields: {
    },
    containerBody: {
        alignItems: 'stretch',
        paddingLeft: paddingH,
        paddingRight: paddingH,
        justifyContent: 'space-between',
        paddingBottom: 20,
    },
    title: {
        fontFamily,
        color: color.white,
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 20,
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
        fontSize: 14,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 20,
        textAlign: 'center'
    },
    list: {
    },
    listItem: {
        marginBottom: 20,
        paddingLeft: 30,
        position: 'relative',
    },
    text: {
        fontFamily,
        color: color.whiteOpacity60,
        fontSize: 14,
        textAlign: 'left'
    },
    num: {
        position: 'absolute',
        top: 0,
        left: 0,
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
        alignItems: 'stretch',
        paddingLeft: paddingH,
        paddingRight: paddingH,
        paddingTop: 20,
        paddingBottom: 20,
    },
    modalTitle: {
        fontFamily,
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 10,
        textAlign: 'center',
    },
    modalTitleCost: {
        marginBottom: 30,
    },
    modalText: {
        fontFamily,
        fontSize: 14,
        marginBottom: 30,
        textAlign: 'center',
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
});
